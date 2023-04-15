import styled from "styled-components";

// ############## DIALOG #####################################
export const Dialog = styled.div`
  z-index: 9999;
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 30px;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  background: #3B3B3B;
  // display: ${({ show }) => (show ? "block" : "none")};
  display: ${({ show }) => (show ? "flex" : "none")};

  justify-content: center;
  align-items: baseline;

  max-height: 500px;
  overflow: auto;

&::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
}
&::-webkit-scrollbar-thumb {
  background: white; 
  border-radius: 10px;
}

`;

export const DialogBackground = styled.div`
  z-index: 9998;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  display: ${({ show }) => (show ? "block" : "none")};
`;
// ############## DIALOG #####################################
