import {circle} from "./shapes.js";
import {matrixMultiply} from "./matrix.js";

/**
 * A point in three dimensional euclidean space.
 * @param {number} x coordinate. 
 * @param {number} y coordinate.
 * @param {number} z coordinate
 * @returns void
 */
function Point3D(origin, radius, x, y, z) {
    this.origin = origin;
    this.radius = radius;
    this.coordinates = [[x], [y], [z]];
}

/**
 * @returns x coordinate of point. 
 */
Point3D.prototype.getX = function() {
    return this.coordinates[0][0];
};

/**
 * @returns x coordinate of point. 
 */
Point3D.prototype.getCanvasX = function() {
    return this.coordinates[0][0] + this.origin[0];
};

/**
 * @returns x coordinate of point. 
 */
Point3D.prototype.setX = function(x) {
    this.coordinates[0][0] = x;
};

/**
 * @returns y coordinate of point. 
 */
Point3D.prototype.getY = function() {
    return this.coordinates[1][0];
};

Point3D.prototype.getCanvasY = function() {
    return this.coordinates[1][0] + this.origin[1];
};

Point3D.prototype.setY = function(y) {
    this.coordinates[1][0] = y;
};

/**
 * @returns z coordinate of point. 
 */
Point3D.prototype.getZ = function() {
    return this.coordinates[2][0];
};

Point3D.prototype.setZ = function(z) {
    this.coordinates[2][0] = z;
};

Point3D.prototype.setOrigin = function(origin) {
    this.origin = origin;
};
/**
 * @returns projected point. 
 */
Point3D.prototype.project = function(projectionMatrix) {
    return matrixMultiply(projectionMatrix, this.coordinates);
};

/**
 * @returns void. 
 */
Point3D.prototype.multiply = function(matrix) {
    this.coordinates = matrixMultiply(matrix, this.coordinates);
}

/**
 *  Projects three dimensional point to two dimensional canvas contex. 
 */
Point3D.prototype.draw = function(ctx) {
    circle(ctx, this.getX() + this.origin[0], this.getY() + this.origin[1], this.radius, 'white');
};

export {Point3D};