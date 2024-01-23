// ==============================|| OVERRIDES - INPUT LABEL ||============================== //

export default function InputLabel(theme) {
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.grey[600]
        },
        outlined: {
          lineHeight: '0.875rem',
          top: '-2px',
          overflow: 'auto',
          '&.MuiInputLabel-sizeSmall': {
            lineHeight: '1em'
          },
          '&.MuiInputLabel-shrink': {
            background: theme.palette.background.paper,
            padding: '0 8px',
            marginLeft: -6,
            lineHeight: '1.4375em'
          }
        }
      }
    }
  };
}
