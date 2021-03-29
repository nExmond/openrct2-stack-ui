
/**
 * Interface for interaction between UI elements.
 * @template T *UIWidget* or *UIWindow* or *UITab*
 */
interface UIProxy<T> {

    /**
     * Accessing UI elements
     */
    ui?: T;

    /**
     * Binding internally
     */
    _bind(ui: T): void;
}