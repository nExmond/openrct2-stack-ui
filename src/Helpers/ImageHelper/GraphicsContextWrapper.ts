/// <reference path="ImageInfoWrapper.ts" />

/**
 * Interface restricted to use only the size calculation function of *GraphicsContext*.
 */
interface GraphicsContextWrapper {

    /**
     * Get image information by sprite ID.
     * @param id 
     * @returns image info
     */
    getImage(id: number): ImageInfoWrapper | undefined;

    /**
     * Calculate the size of the string.
     * @param text
     * @returns text size
     */
    measureText(text: string): UISize;
}