// ============================================================
//  Avatar3DScene – Portfolio 3D Avatar
//  Landing & About: Standing position, avatar on the right
//  On scroll to Skills: Smooth transition to sitting at desk
//  Further  : Fade out canvas after Skills section
// ============================================================

class Avatar3DScene {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene      = null;
    this.camera     = null;
    this.renderer   = null;
    this.clock      = new THREE.Clock();
    this.model      = null;
    this.bones      = {};
    this.blinkTimer = 0;
    this.mouse      = { x: 0, y: 0 };
    this.isLoaded   = false;

    // Single transition progress state (0 = Standing at Hero/About, 1 = Sitting at Skills)
    this.scrollProgress = 0;

    // ── STANDING camera: Upper body close-up, avatar positioned right ──
    this.cameraPos  = { x: 2.1, y: 1.45, z: 1.4 };
    this.cameraLook = { x: -2.3, y: 1.35, z: 0.0 };

    // ── SITTING camera: Close-up typing at desk (shifted left) ──
    this.skillsTargetPos  = { x: 0.8, y: 1.25, z: 2.2 };
    this.skillsTargetLook = { x: -0.2, y: 0.9, z: 0.0 };

    // Current interpolated camera states
    this.currentCamPos  = { ...this.cameraPos };
    this.currentCamLook = { ...this.cameraLook };
    this.currentFov     = 31;

    this.workspaceGroup = null;
    this.laptopGroup = null;
    this.screenLight = null;

    this.init();
  }

  // ─────────────────────────────────────────────────────────
  init() {
    this.scene = new THREE.Scene();

    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera  = new THREE.PerspectiveCamera(31, aspect, 0.1, 100);
    this.camera.position.set(this.cameraPos.x, this.cameraPos.y, this.cameraPos.z);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true, alpha: true, powerPreference: "high-performance"
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.shadowMap.enabled   = false;
    this.renderer.toneMapping         = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure  = 1.2;
    this.container.appendChild(this.renderer.domElement);

    this._buildLights();
    this._buildWorkspace();
    this.loadAvatar();

    window.addEventListener("resize",    () => this.onWindowResize());
    window.addEventListener("mousemove", (e) => this.onMouseMove(e));
    this.animate();
  }

  // ─────────────────────────────────────────────────────────
  _buildLights() {
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    // Key light — upper-right front (warm pink tone)
    const key = new THREE.DirectionalLight(0xffd0e8, 1.6);
    key.position.set(2.5, 4.0, 3.0);
    this.scene.add(key);

    // Fill — left, cooler blue
    const fill = new THREE.DirectionalLight(0xc8d8ff, 0.5);
    fill.position.set(-3.0, 2.5, 2.0);
    this.scene.add(fill);

    // Rim — behind avatar, purple glow
    const rim = new THREE.DirectionalLight(0xaa66ff, 0.8);
    rim.position.set(0.0, 2.0, -2.5);
    this.scene.add(rim);

    // Under glow
    const underGlow = new THREE.PointLight(0x9944dd, 0.6, 3.0);
    underGlow.position.set(0.0, 0.0, 0.5);
    this.scene.add(underGlow);

    // Front face light
    const faceLight = new THREE.PointLight(0xffeeff, 0.3, 2.0);
    faceLight.position.set(0.0, 1.6, 1.5);
    this.scene.add(faceLight);
  }

  // ─────────────────────────────────────────────────────────
  _buildWorkspace() {
    this.workspaceGroup = new THREE.Group();
    this.workspaceGroup.position.set(0, 0, 0);
    this.workspaceGroup.scale.set(0, 0, 0); // Hidden initially
    this.scene.add(this.workspaceGroup);

    // 1. Desk Tabletop
    const tableGeom = new THREE.BoxGeometry(1.6, 0.04, 0.9);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.15,
      metalness: 0.1
    });
    const tableTop = new THREE.Mesh(tableGeom, tableMat);
    tableTop.position.set(0, 0.75, 0.15); // height 0.75m, in front of avatar
    this.workspaceGroup.add(tableTop);

    // 2. Desk Legs
    const legGeom = new THREE.CylinderGeometry(0.02, 0.02, 0.75, 8);
    const legMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      roughness: 0.2,
      metalness: 0.8
    });
    
    const legPositions = [
      [-0.75, 0.375, -0.25],
      [0.75, 0.375, -0.25],
      [-0.75, 0.375, 0.55],
      [0.75, 0.375, 0.55]
    ];
    legPositions.forEach(pos => {
      const leg = new THREE.Mesh(legGeom, legMat);
      leg.position.set(pos[0], pos[1], pos[2]);
      this.workspaceGroup.add(leg);
    });

    // 3. Laptop
    this.laptopGroup = new THREE.Group();
    this.laptopGroup.position.set(0, 0.77, 0.15);
    
    // Laptop Base
    const baseGeom = new THREE.BoxGeometry(0.3, 0.015, 0.2);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.3, metalness: 0.8 });
    const base = new THREE.Mesh(baseGeom, baseMat);
    this.laptopGroup.add(base);

    // Laptop Screen lid
    const screenGroup = new THREE.Group();
    screenGroup.position.set(0, 0.007, -0.1);
    
    const screenGeom = new THREE.BoxGeometry(0.3, 0.2, 0.012);
    const screenMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.3, metalness: 0.8 });
    const screen = new THREE.Mesh(screenGeom, screenMat);
    screen.position.set(0, 0.1, 0);
    screenGroup.add(screen);

    // Glowing screen display
    const displayGeom = new THREE.PlaneGeometry(0.28, 0.18);
    const displayMat = new THREE.MeshBasicMaterial({ color: 0xaa66ff });
    const display = new THREE.Mesh(displayGeom, displayMat);
    display.position.set(0, 0.1, 0.007);
    screenGroup.add(display);

    // Screen light casting glow on avatar face
    this.screenLight = new THREE.PointLight(0xcc99ff, 0.0, 1.5);
    this.screenLight.position.set(0, 0.1, 0.15);
    screenGroup.add(this.screenLight);

    screenGroup.rotation.x = 0.3;
    this.laptopGroup.add(screenGroup);
    this.workspaceGroup.add(this.laptopGroup);

    // 4. Chair
    const seatGeom = new THREE.BoxGeometry(0.45, 0.04, 0.45);
    const seatMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
    const seat = new THREE.Mesh(seatGeom, seatMat);
    seat.position.set(0, 0.46, -0.32);
    this.workspaceGroup.add(seat);

    const backGeom = new THREE.BoxGeometry(0.42, 0.5, 0.04);
    const back = new THREE.Mesh(backGeom, seatMat);
    back.position.set(0, 0.72, -0.525);
    back.rotation.x = -0.05;
    this.workspaceGroup.add(back);

    const stemGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.44, 8);
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.9, roughness: 0.1 });
    const stem = new THREE.Mesh(stemGeom, stemMat);
    stem.position.set(0, 0.22, -0.32);
    this.workspaceGroup.add(stem);

    const ringGeom = new THREE.TorusGeometry(0.2, 0.015, 8, 24);
    const ring = new THREE.Mesh(ringGeom, stemMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, 0.01, -0.32);
    this.workspaceGroup.add(ring);
  }

  // ─────────────────────────────────────────────────────────
  loadAvatar() {
    const loader = new THREE.GLTFLoader();

    loader.load(
      "models/female.glb",
      (gltf) => {
        this.model = gltf.scene;

        this.model.traverse(child => {
          if (child.isMesh) {
            child.castShadow    = false;
            child.receiveShadow = false;
            if (child.material) {
              child.material.roughness       = Math.max(child.material.roughness ?? 0.6, 0.45);
              child.material.metalness       = Math.min(child.material.metalness ?? 0.0, 0.1);
              child.material.envMapIntensity = 0.4;
              
              // Change clothing colors dynamically to a high-craft cyberpunk teal/black outfit
              if (child.name === "Wolf3D_Outfit_Top") {
                child.material.color.setHex(0x0d9488); // Cyberpunk rich teal top
              } else if (child.name === "Wolf3D_Outfit_Bottom") {
                child.material.color.setHex(0x0e0e11); // Sleek onyx black pants
              } else if (child.name === "Wolf3D_Outfit_Footwear") {
                child.material.color.setHex(0x0d9488); // Matching teal footwear highlights
              }
            }
          }
          if (child.isBone || child.type === "Bone") {
            this.bones[child.name] = child;
          }
        });

        this.model.scale.set(0.95, 0.95, 0.95);
        this.model.rotation.y = 0; // Face forward (+Z)
        this.model.position.set(0.0, 0.0, 0.0);

        this.poseHero();
        this.saveStandingRotations();

        this.scene.add(this.model);
        this.isLoaded = true;

        if (window._on3DReady) window._on3DReady();

        // Smooth fade-in
        this.model.traverse(child => {
          if (child.isMesh && child.material) {
            child.material.transparent = true;
            child.material.opacity = 0;
          }
        });

        const fadeIn = () => {
          let allDone = true;
          this.model.traverse(child => {
            if (child.isMesh && child.material && child.material.opacity < 1) {
              child.material.opacity = Math.min(1, child.material.opacity + 0.04);
              if (child.material.opacity < 1) allDone = false;
            }
          });
          if (!allDone) requestAnimationFrame(fadeIn);
          else {
            this.model.traverse(child => {
              if (child.isMesh && child.material) {
                child.material.transparent = false;
              }
            });
          }
        };
        requestAnimationFrame(fadeIn);
      },
      (progress) => {
        if (progress.total > 0 && window._on3DProgress) {
          window._on3DProgress(progress.loaded / progress.total);
        }
      },
      (err) => console.error("GLB load error:", err)
    );
  }

  // ─────────────────────────────────────────────────────────
  poseHero() {
    const b = this.bones;

    const bone = (name) => {
      let mappedName = name;
      if (name === "LeftUpperArm") mappedName = "LeftArm";
      else if (name === "LeftLowerArm") mappedName = "LeftForeArm";
      else if (name === "RightUpperArm") mappedName = "RightArm";
      else if (name === "RightLowerArm") mappedName = "RightForeArm";
      else if (name === "LeftUpperLeg") mappedName = "LeftUpLeg";
      else if (name === "LeftLowerLeg") mappedName = "LeftLeg";
      else if (name === "RightUpperLeg") mappedName = "RightUpLeg";
      else if (name === "RightLowerLeg") mappedName = "RightLeg";
      return b[mappedName] || b[`mixamorig${mappedName}`] || b[`mixamorig:${mappedName}`] || null;
    };

    // Keep all legs, hips, spine, neck, and head rotations at their GLB defaults.
    // Overwriting them causes coordinates mapping errors (making the character upside-down).

    const leftUpperArm = bone("LeftUpperArm");
    const leftLowerArm = bone("LeftLowerArm");
    const leftHand = bone("LeftHand");
    const rightUpperArm = bone("RightUpperArm");

    // Left arm raised to chin/cheek in thinking pose (hand touching cheek/chin)
    if (leftUpperArm) {
      leftUpperArm.rotation.set(1.2, -2.0, 0.0);
    }
    if (leftLowerArm) {
      leftLowerArm.rotation.set(2.9, 0.0, 0.0);
    }
    if (leftHand) {
      leftHand.rotation.set(0.3, 0.4, -0.3);
    }

    // Curl fingers inward to make a proper pensive thinking fist/cup pose
    const curlVal = -1.2;
    const fingersList = ['Middle', 'Ring', 'Pinky'];
    fingersList.forEach(f => {
      for (let i = 1; i <= 3; i++) {
        const joint = b[`LeftHand${f}${i}`] || b[`mixamorigLeftHand${f}${i}`] || b[`mixamorig:LeftHand${f}${i}`];
        if (joint) joint.rotation.z = curlVal;
      }
    });

    // Slight curl on Index finger (so it rests naturally against chin/cheek)
    for (let i = 1; i <= 3; i++) {
      const joint = b[`LeftHandIndex${i}`] || b[`mixamorigLeftHandIndex${i}`] || b[`mixamorig:LeftHandIndex${i}`];
      if (joint) joint.rotation.z = curlVal * 0.4;
    }

    // Slight curl on Thumb
    for (let i = 1; i <= 3; i++) {
      const joint = b[`LeftHandThumb${i}`] || b[`mixamorigLeftHandThumb${i}`] || b[`mixamorig:LeftHandThumb${i}`];
      if (joint) joint.rotation.z = curlVal * 0.3;
    }

    // Right arm relaxed down at side
    if (rightUpperArm) {
      rightUpperArm.rotation.x = 1.35;
    }
  }

  // ─────────────────────────────────────────────────────────
  saveStandingRotations() {
    if (!this.model) return;
    this.model.traverse(child => {
      if (child.isBone || child.type === "Bone") {
        child.userData.standRot = {
          x: child.rotation.x,
          y: child.rotation.y,
          z: child.rotation.z
        };
      }
    });
  }

  // ─────────────────────────────────────────────────────────
  lerp(a, b, t) {
    return a + (b - a) * t;
  }

  lerpRotation(bone, targetRot, progress) {
    if (!bone || !bone.userData.standRot) return;
    bone.rotation.x = this.lerp(bone.userData.standRot.x, targetRot.x, progress);
    bone.rotation.y = this.lerp(bone.userData.standRot.y, targetRot.y, progress);
    bone.rotation.z = this.lerp(bone.userData.standRot.z, targetRot.z, progress);
  }

  // ─────────────────────────────────────────────────────────
  applySittingPose(progress) {
    const b = this.bones;
    const bone = (name) => {
      let mappedName = name;
      if (name === "LeftUpperArm") mappedName = "LeftArm";
      else if (name === "LeftLowerArm") mappedName = "LeftForeArm";
      else if (name === "RightUpperArm") mappedName = "RightArm";
      else if (name === "RightLowerArm") mappedName = "RightForeArm";
      else if (name === "LeftUpperLeg") mappedName = "LeftUpLeg";
      else if (name === "LeftLowerLeg") mappedName = "LeftLeg";
      else if (name === "RightUpperLeg") mappedName = "RightUpLeg";
      else if (name === "RightLowerLeg") mappedName = "RightLeg";
      return b[mappedName] || b[`mixamorig${mappedName}`] || b[`mixamorig:${mappedName}`] || null;
    };

    // 1. Lower entire model to seat level and slide slightly back onto chair
    if (this.model) {
      this.model.position.y = this.lerp(0.0, -0.44, progress);
      this.model.position.z = this.lerp(0.0, -0.32, progress);
    }

    // 2. Rotate Leg Thighs & Shins (relative to saved stand pose)
    const leftUpperLeg = bone("LeftUpperLeg");
    const rightUpperLeg = bone("RightUpperLeg");
    if (leftUpperLeg) this.lerpRotation(leftUpperLeg, { x: 1.4, y: 0.05, z: 0.0 }, progress);
    if (rightUpperLeg) this.lerpRotation(rightUpperLeg, { x: 1.4, y: -0.05, z: 0.0 }, progress);

    const leftLowerLeg = bone("LeftLowerLeg");
    const rightLowerLeg = bone("RightLowerLeg");
    if (leftLowerLeg) this.lerpRotation(leftLowerLeg, { x: 1.4, y: 0.0, z: 0.0 }, progress);
    if (rightLowerLeg) this.lerpRotation(rightLowerLeg, { x: 1.4, y: 0.0, z: 0.0 }, progress);

    // 3. Lean Spine forward slightly
    const spine = bone("Spine");
    const spine1 = bone("Spine1");
    const spine2 = bone("Spine2");
    if (spine) this.lerpRotation(spine, { x: 0.12, y: 0.0, z: 0.0 }, progress);
    if (spine1) this.lerpRotation(spine1, { x: 0.06, y: 0.0, z: 0.0 }, progress);
    if (spine2) this.lerpRotation(spine2, { x: 0.04, y: 0.0, z: 0.0 }, progress);

    // 4. Pose Arms & Forearms for Typing (Raised hands onto the laptop)
    const leftUpperArm = bone("LeftUpperArm");
    const leftLowerArm = bone("LeftLowerArm");
    const rightUpperArm = bone("RightUpperArm");
    const rightLowerArm = bone("RightLowerArm");

    if (leftUpperArm) this.lerpRotation(leftUpperArm, { x: 0.7, y: -0.2, z: -0.3 }, progress);
    if (leftLowerArm) this.lerpRotation(leftLowerArm, { x: 1.2, y: 0.2, z: 0.0 }, progress);

    if (rightUpperArm) this.lerpRotation(rightUpperArm, { x: 0.7, y: 0.2, z: 0.3 }, progress);
    if (rightLowerArm) this.lerpRotation(rightLowerArm, { x: 1.2, y: -0.2, z: 0.0 }, progress);

    // Hands and finger wiggles (typing motion)
    const leftHand = bone("LeftHand");
    const rightHand = bone("RightHand");
    const time = this.clock.getElapsedTime();

    // Dynamically uncurl fingers when sitting
    const curlVal = -1.2;
    const fingersList = ['Middle', 'Ring', 'Pinky'];
    
    // Smoothly uncurl fingers from the thinking pose fist to typing flat hands
    fingersList.forEach(f => {
      for (let i = 1; i <= 3; i++) {
        const lJoint = this.bones[`LeftHand${f}${i}`] || this.bones[`mixamorigLeftHand${f}${i}`] || this.bones[`mixamorig:LeftHand${f}${i}`];
        if (lJoint) {
          lJoint.rotation.z = this.lerp(curlVal, -0.1, progress);
        }
      }
    });
    
    const index1 = this.bones[`LeftHandIndex1`] || this.bones[`mixamorigLeftHandIndex1`] || this.bones[`mixamorig:LeftHandIndex1`];
    if (index1) index1.rotation.z = this.lerp(-0.6, -0.1, progress);
    const index2 = this.bones[`LeftHandIndex2`] || this.bones[`mixamorigLeftHandIndex2`] || this.bones[`mixamorig:LeftHandIndex2`];
    if (index2) index2.rotation.z = this.lerp(-0.8, -0.1, progress);

    if (progress > 0.8) {
      if (leftHand) {
        leftHand.rotation.x = -0.15 + Math.sin(time * 18) * 0.06;
        leftHand.rotation.z = Math.cos(time * 12) * 0.03;
      }
      if (rightHand) {
        rightHand.rotation.x = -0.15 + Math.cos(time * 18 + 0.5) * 0.06;
        rightHand.rotation.z = Math.sin(time * 12 + 0.5) * 0.03;
      }
      
      // Subtle finger wiggling on keypress
      fingersList.forEach(f => {
        for (let i = 1; i <= 3; i++) {
          const lJoint = this.bones[`LeftHand${f}${i}`] || this.bones[`mixamorigLeftHand${f}${i}`] || this.bones[`mixamorig:LeftHand${f}${i}`];
          if (lJoint) lJoint.rotation.z = -0.15 + Math.sin(time * 24 + i) * 0.06;
          
          const rJoint = this.bones[`RightHand${f}${i}`] || this.bones[`mixamorigRightHand${f}${i}`] || this.bones[`mixamorig:RightHand${f}${i}`];
          if (rJoint) rJoint.rotation.z = -0.15 + Math.cos(time * 24 + i) * 0.06;
        }
      });
      
      if (index1) index1.rotation.z = -0.15 + Math.sin(time * 20) * 0.05;
      if (index2) index2.rotation.z = -0.15 + Math.cos(time * 20) * 0.05;
    } else {
      if (leftHand) this.lerpRotation(leftHand, { x: -0.1, y: 0.0, z: 0.0 }, progress);
      if (rightHand) this.lerpRotation(rightHand, { x: -0.1, y: 0.0, z: 0.0 }, progress);
    }
  }

  // ─────────────────────────────────────────────────────────
  setMorphTarget(name, value) {
    if (!this.model) return;
    this.model.traverse(child => {
      if (child.isMesh && child.morphTargetDictionary && child.morphTargetInfluences) {
        const i = child.morphTargetDictionary[name];
        if (i !== undefined) child.morphTargetInfluences[i] = value;
      }
    });
  }

  // ─────────────────────────────────────────────────────────
  onMouseMove(e) {
    this.mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  onWindowResize() {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  // ─────────────────────────────────────────────────────────
  animate() {
    requestAnimationFrame(() => this.animate());
    const delta = this.clock.getDelta();
    const time  = this.clock.getElapsedTime();

    if (this.model && this.isLoaded) {
      const bone = (name) => {
        let mappedName = name;
        if (name === "LeftUpperArm") mappedName = "LeftArm";
        else if (name === "LeftLowerArm") mappedName = "LeftForeArm";
        else if (name === "RightUpperArm") mappedName = "RightArm";
        else if (name === "RightLowerArm") mappedName = "RightForeArm";
        return this.bones[mappedName] || this.bones[`mixamorig${mappedName}`] || this.bones[`mixamorig:${mappedName}`] || null;
      };

      const poseProgress = this.scrollProgress < 0.5 ? 0.0 : 1.0;

      // Apply standing-to-sitting pose blending
      this.applySittingPose(poseProgress);

      // Rotate model to face the camera when standing, and face forward when sitting
      this.model.rotation.y = this.lerp(Math.atan2(this.cameraPos.x, this.cameraPos.z), 0, poseProgress);

      // Dampen breathing when sitting so it doesn't clip
      const breathingScale = 1.0 - poseProgress;
      if (breathingScale > 0.05) {
        // Idle breathing (ASSIGNMENT to prevent bone rotation accumulation bug)
        const spine  = bone("Spine");
        const spine2 = bone("Spine2");
        if (spine && spine.userData.standRot) {
          spine.rotation.x = this.lerp(spine.userData.standRot.x, 0.15, poseProgress) + Math.sin(time * 1.2) * 0.008 * breathingScale;
        }
        if (spine2 && spine2.userData.standRot) {
          spine2.rotation.x = this.lerp(spine2.userData.standRot.x, 0.05, poseProgress) + Math.sin(time * 1.2 + 0.3) * 0.005 * breathingScale;
        }

        // Subtle body sway
        const hips = bone("Hips");
        if (hips) {
          hips.rotation.y = Math.sin(time * 0.5) * 0.015 * breathingScale;
        }
      }

      // Head tracking (looking at mouse or screen) + thinking pose baseline
      const head = bone("Head");
      const neck = bone("Neck");
      
      let tY = this.mouse.x * 0.35;
      let tX = -this.mouse.y * 0.2;
      
      const expProgress = 1.0 - poseProgress;
      
      // Thinking pose head adjustments (straight ahead)
      const thinkingHeadY = 0.0;
      const thinkingHeadX = 0.0;
      const thinkingHeadZ = 0.0;

      if (poseProgress > 0.8) {
        // Look down at screen
        tY = 0.0;
        tX = 0.3;
      }

      if (head) {
        const targetY = tY + thinkingHeadY;
        const targetX = tX + thinkingHeadX;
        const targetZ = thinkingHeadZ;
        head.rotation.y += (targetY - head.rotation.y) * 0.04;
        head.rotation.x += (targetX - head.rotation.x) * 0.04;
        head.rotation.z += (targetZ - head.rotation.z) * 0.04;
      }
      if (neck) {
        const targetY = tY * 0.3 + thinkingHeadY * 0.5;
        const targetX = tX * 0.15 - 0.03 + thinkingHeadX * 0.5;
        const targetZ = thinkingHeadZ * 0.5;
        neck.rotation.y += (targetY - neck.rotation.y) * 0.04;
        neck.rotation.x += (targetX - neck.rotation.x) * 0.04;
        neck.rotation.z += (targetZ - neck.rotation.z) * 0.04;
      }

      // Apply thinking expression morph targets when standing, lerp to 0 when sitting
      this.setMorphTarget("browInnerUp",      0.45 * expProgress);
      this.setMorphTarget("mouthPucker",       0.12 * expProgress);
      this.setMorphTarget("mouthShrugUpper",   0.15 * expProgress);
      this.setMorphTarget("mouthDimpleLeft",   0.15 * expProgress);
      this.setMorphTarget("mouthDimpleRight",  0.15 * expProgress);
    }

    // ── Blink ──
    this.blinkTimer += delta;
    if (this.blinkTimer > 3.2) {
      const bp = (this.blinkTimer - 3.2) / 0.15;
      if (bp <= 1.0) {
        const v = Math.sin(bp * Math.PI);
        this.setMorphTarget("eyeBlinkLeft",  v);
        this.setMorphTarget("eyeBlinkRight", v);
      } else {
        this.setMorphTarget("eyeBlinkLeft",  0);
        this.setMorphTarget("eyeBlinkRight", 0);
        this.blinkTimer = Math.random() * 2.0;
      }
    }

    // ── Workspace scale/intensity update ──
    if (this.workspaceGroup) {
      const poseProgress = this.scrollProgress < 0.5 ? 0.0 : 1.0;
      const wsScale = poseProgress;
      this.workspaceGroup.scale.set(wsScale, wsScale, wsScale);
      if (this.screenLight) {
        this.screenLight.intensity = poseProgress * 2.2;
      }
    }

    // ── Camera interpolation ──
    if (this.camera) {
      const poseProgress = this.scrollProgress < 0.5 ? 0.0 : 1.0;
      const p = poseProgress;
      
      const targetCamPos = {
        x: this.lerp(this.cameraPos.x, this.skillsTargetPos.x, p),
        y: this.lerp(this.cameraPos.y, this.skillsTargetPos.y, p),
        z: this.lerp(this.cameraPos.z, this.skillsTargetPos.z, p)
      };

      const targetCamLook = {
        x: this.lerp(this.cameraLook.x, this.skillsTargetLook.x, p),
        y: this.lerp(this.cameraLook.y, this.skillsTargetLook.y, p),
        z: this.lerp(this.cameraLook.z, this.skillsTargetLook.z, p)
      };

      const targetFov = this.lerp(31, 28, p);

      // Smooth camera interpolation
      const lerpSpeed = 0.08;
      this.currentCamPos.x += (targetCamPos.x - this.currentCamPos.x) * lerpSpeed;
      this.currentCamPos.y += (targetCamPos.y - this.currentCamPos.y) * lerpSpeed;
      this.currentCamPos.z += (targetCamPos.z - this.currentCamPos.z) * lerpSpeed;
      this.currentCamLook.x += (targetCamLook.x - this.currentCamLook.x) * lerpSpeed;
      this.currentCamLook.y += (targetCamLook.y - this.currentCamLook.y) * lerpSpeed;
      this.currentCamLook.z += (targetCamLook.z - this.currentCamLook.z) * lerpSpeed;
      this.currentFov += (targetFov - this.currentFov) * lerpSpeed;

      this.camera.position.set(this.currentCamPos.x, this.currentCamPos.y, this.currentCamPos.z);
      this.camera.lookAt(this.currentCamLook.x, this.currentCamLook.y, this.currentCamLook.z);
      this.camera.fov = this.currentFov;
      this.camera.updateProjectionMatrix();
    }



    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  // ─────────────────────────────────────────────────────────
  setupScrollTrigger() {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#skills",
        start: "top bottom",
        end: "top top",
        scrub: 1.0,
        invalidateOnRefresh: true
      }
    });

    // 1. Fade out the canvas
    tl.to("#renderer3d", { opacity: 0, duration: 0.4, ease: "power1.out" });
    
    // 2. Switch the 3D scrollProgress state midway
    tl.to(this, { scrollProgress: 1.0, duration: 0.2, ease: "none" });
    
    // 3. Fade the canvas back in
    tl.to("#renderer3d", { opacity: 1, duration: 0.4, ease: "power1.in" });

    // ── Fade out canvas after About section ──
    gsap.fromTo("#renderer3d",
      { opacity: 1 },
      {
        opacity: 0,
        scrollTrigger: {
          trigger: "#about",
          start: "center center",
          end: "bottom top",
          scrub: true,
          onLeave: () => gsap.set("#renderer3d", { display: "none" }),
          onEnterBack: () => gsap.set("#renderer3d", { display: "block" })
        }
      }
    );
  }

  debugBones() {
    console.log("=== Detected Bones ===");
    Object.keys(this.bones).forEach(name => console.log(name));
    console.log("======================");
  }
}

window.Avatar3DScene = Avatar3DScene;
window.PortfolioAvatarInstance = null;
