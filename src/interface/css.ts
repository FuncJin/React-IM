type Cursor =
    | 'pointer'
    | 'text'
    | 'wait'
    | 'help'
    | 'default'
    | 'crosshair'
    | 'e-resize'
    | 'ne-resize'
    | 'n-resize'
    | 'nw-resize'
    | 'w-resize'
    | 'sw-resize'
    | 's-resize'
    | 'se-resize'
    | 'auto'
    | 'not-allowed'
    | 'zoom-in'
    | 'zoom-out'

export interface CssStyle {
    cursor: Cursor
}
