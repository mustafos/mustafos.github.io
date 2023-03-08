// MENU SHOW Y HIDDEN
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

// MENU SHOW
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

// MENU HIDDEN
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

// REMOVE MENU MOBILE
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

// ACCORDION SKILLS
const skillsContent = document.getElementsByClassName('skills__content'), 
      skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className

    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) =>{
    el.addEventListener('click', toggleSkills)
})

// QUALIFICATION TABS
const tabs = document.querySelectorAll('[data-target'), 
tabContents = document.querySelectorAll('[data-content')

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContents =>{
            tabContents.classList.remove('qualification__active')
        })
        target.classList.add("qualification__active")

        tab.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/*==================== PORTFOLIO SWIPER  ====================*/
let swiper = new Swiper('.portfolio__container', {
    cssMode: true,
    loop: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

/*==================== Launch Screen  ====================*/
import * as THREE from "https://cdn.skypack.dev/three@0.149.0";
import * as maath from "https://cdn.skypack.dev/maath@0.5.2";

let camera, scene, renderer, clock, points;
let uniforms;

const box = maath.random.inBox(new Float32Array(10_000), {
    sides: [30, 30, 1]
});

const sphere = maath.random.inSphere(box.slice(0), { radius: 2.75 });

const final = box.slice(0);

function init() {
    const container = document.getElementById("shader");

    clock = new THREE.Clock();

    scene = new THREE.Scene();

    uniforms = {
        uTime: { type: "f", value: 1.0 },
        uResolution: { type: "v2", value: new THREE.Vector2() },
        u_progress: {
            value: 0
        },
        uMouse: {
            value: { x: 0.5, y: 0.5 }
        }
    };

    const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: document.getElementById("vertex").textContent,
        fragmentShader: document.getElementById("fragment").textContent
    });

    material.transparent = true;
    material.depthWrite = false;

    const pointsGeometry = new THREE.BufferGeometry();

    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(box, 3));

    renderer = new THREE.WebGLRenderer();
    // renderer.setClearColor(0xffffff, 1);
    renderer.setPixelRatio(window.devicePixelRatio);

    material.uniforms.uResolution.value.x = renderer.domElement.width;
    material.uniforms.uResolution.value.y = renderer.domElement.height;

    camera = new THREE.PerspectiveCamera(
        400,
        renderer.domElement.width / renderer.domElement.height,
        0.1,
        100
    );
    camera.position.z = 14;
    camera.position.y = 0;
    camera.position.x = 0;

    let running = false;

    let finished = function () {
        running = false;
    };

    points = new THREE.Points(pointsGeometry, material);
    scene.add(points);

    window.addEventListener("mousemove", function (e) {
        material.uniforms.uMouse.value.x =
            (event.clientX / window.innerWidth) * 2 - 1;
        material.uniforms.uMouse.value.y =
            -(event.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener("click", function (e) {
        if (!running) {
            running = true;
            gsap.to(material.uniforms.u_progress, {
                duration: 6.5,
                value: material.uniforms.u_progress.value + Math.PI,
                delay: 0,
                onComplete: finished
            });
        }
    });

    container.appendChild(renderer.domElement);

    onWindowResize();
    window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.uResolution.value.x = renderer.domElement.width;
    uniforms.uResolution.value.y = renderer.domElement.height;
}

function render() {
    uniforms.uTime.value = clock.getElapsedTime();
    renderer.render(scene, camera);

    if (points) {
        const t = maath.misc.remap(
            Math.sin(clock.getElapsedTime() * 0.02),
            [-1, 1],
            [0, 1]
        );

        maath.buffer.lerp(box, sphere, final, t);
        points.geometry.attributes.position.needsUpdate = true;
        points.geometry.attributes.position.array = final;
    }
}

function animate() {
    render();
    requestAnimationFrame(animate);
}

init();
animate();
