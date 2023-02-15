/**
 * Naive approach to multiplying two matrices.
 * @param {object} m1 two dimensional array (matrix). 
 * @param {object} m2 two two dimensional array (matrix).
 * @returns {object} m1 x m2.
 */
export function matrixMultiply(m1, m2) {
    if (m1[0].length != m2.length) {
        throw new Error("Invalid matrix multiplication.");

    }
    let product = Array(m1.length).fill().map(() => Array(m2[0].length)); // empty 2d array
    for (let row = 0; row < m1.length; row++){
        for (let col = 0; col < m2[0].length; col++) {
            let dotproduct = 0;
            for (let i = 0; i < m1[row].length; i++) {
                dotproduct += m1[row][i] * m2[i][col];
            }
            product[row][col] = dotproduct;
        }
    }
    return product;
}
