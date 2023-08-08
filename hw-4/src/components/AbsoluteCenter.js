import styled from '@emotion/styled'

const AbsoluteCenter = styled.div`
  position: absolute;
  margin: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${props => props.isEnabled ? '' : 'none'}
`

export default AbsoluteCenter;