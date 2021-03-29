
const UIEdgeInsetsZero: UIEdgeInsets = { top: 0, left: 0, bottom: 0, right: 0 };
const UIEdgeInsetsContainer: UIEdgeInsets = { top: 16, left: 2, bottom: 2, right: 2 };
const UIEdgeInsetsTabContainer: UIEdgeInsets = { top: 45, left: 2, bottom: 2, right: 2 };

/**
 * It is used as the distance away from the parent container.
 */
interface UIEdgeInsets {
    top: number;
    left: number;
    bottom: number;
    right: number;
}