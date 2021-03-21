
interface GraphicsContextWrapper {
    getImage(id: number): ImageInfo | undefined;
    measureText(text: string): ScreenSize;
}
