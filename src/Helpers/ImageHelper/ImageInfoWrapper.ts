/// <reference path="../../UICore/UIPoint.ts" />

/**
 * Interface providing only size information of *ImageInfo*
 */
interface ImageInfoWrapper {
    readonly width: number;
    readonly height: number;
    readonly offset: UIPoint;
}