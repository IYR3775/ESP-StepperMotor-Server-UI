import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Setup from './views/Setup.vue'
import Control from './views/Control.vue'
// import About from './views/About.vue'
import RestApiDoc from './views/RestApiDoc.vue'
import storageHelper from 'storage-helper'

Vue.use(Router)

const routes = [
    // {
    //     path: '/',
    //     name: 'home',
    //     component: Home,
    //     meta: {
    //         title: 'Table Saw control',
    //         description: ''
    //     }
    // },
    {
        path: '/control',
        name: 'control',
        component: Control,
        meta: {
            title: 'Motion control',
            description: 'on this page you can control all configured stepper motors',
            requiresAuth: true
        }
    },
    {
        path: '/password',
        name: 'password',
        component: Control,
        meta: {
            title: 'Password',
            description: 'Enter Password',
            // requiresAuth: true
        }
    },
    {
        path: '/setup',
        name: 'setup',
        component: Setup,
        meta: {
            title: 'Setup',
            description: 'on this page you can configure the ESP-StepperMotor-Server, register stepper motors and limit switches as well as other settings',
            requiresAuth: true
        }
    },
    // {
    //     path: '/about',
    //     name: 'about',
    //     component: About,
    //     meta: {
    //         title: 'About ESP-StepperMotor-Server',
    //         description: ''
    //     }
    // },
    {
        path: '/restapi',
        name: 'REST API',
        component: RestApiDoc,
        meta: {
            title: 'REST API documentation',
            description: ''
        }
    }
];

const router = new Router({
    routes,
    mode: 'hash'
});

router.beforeEach((to, from, next) => {
    if(document.getElementById("header-title-from-content")) {
        document.getElementById("header-title-from-content").innerHTML = to.meta.title;
        document.getElementById("header-description-from-content").innerHTML = to.meta.description;
    }
    if (to.meta.requiresAuth) {
        if (!storageHelper.getItem('user-password')) next('/password')
        else next();
    }
      next();
});

export default router;
