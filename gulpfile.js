'use strict';

var gulp = require('gulp');
var megazord = require('megazord-sdk');

//Registers megazord screen development tasks.
megazord.registerScreenTasks();

gulp.tasks = megazord.gulp.tasks;

//You may add additional tasks here using gulp.