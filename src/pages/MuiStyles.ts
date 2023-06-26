export const ContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '80px',
  padding: '0px 20px',
  textAlign: 'center',
  gap: '5px'
}
export const PageStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  boxSizing: 'border-box',
  '@media(min-width: 320px)': {
    maxWidth: 'none',
    padding: '0px'
  }
}
export const HeaderStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  height: '60px',
  width: '100vw',
  backgroundColor: '#3b3b4f',
  color: '#eeeef0',
  gap: '5px',
  paddingBottom: '5px'
}
export const ElemStyle = {
  width: '140px',
  display: 'flex',
  justifyContent: 'center',
  cursor: 'pointer'
}
export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 'auto',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.default',
  color: 'text.primary',
  border: '2px solid',
  borderColor: 'text.primary',
  boxShadow: 24,
  p: 4
}
export const HomepageWrapper = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  maxWidth: '75%',
  border: '2px solid crimson',
  borderRadius: '4px',
  boxSizing: 'border-box',
  margin: '10px auto'
}
export const HeaderWrapper = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 20px',
  borderBottom: '2px solid crimson',
  boxSizing: 'border-box',
  width: '100%'
}
export const ImageWrapper = {
  border: '1px solid black',
  borderRadius: '10px',
  backgroundColor: 'white'
}
export const CanvasWrapper = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '10px',
  boxSizing: 'border-box'
}
export const ModalWrapper = {
  display: 'flex',
  justifyContent: 'center',
  boxSizing: 'border-box'
}
