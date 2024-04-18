import styled from 'styled-components';
import { Editor } from 'draft-js';

export const DraftContainer = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');

  border: 1px solid gray;
  border-radius: 10px;
  padding: 10px;
  width: 70%;
  min-height: 100px;
  margin: 100px auto;
`;

export const StyledEditor = styled(Editor)`
  @import url('https://fonts.googleapis.com/css2?family=Odibee+Sans&family=Roboto:wght@100&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@1,300&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');
`;

export const EditorBarContainer = styled.div`
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(34, 60, 80, 0.1);
  height: 72px;
  width: 530px;
  position: fixed;
  top: ${({ offset }) => offset?.top - 77 + 'px'};
  left: ${({ offset }) => {
    const leftIndex = offset?.left + (offset?.width - 530) / 2;
    return leftIndex < 30 ? '30px' : leftIndex + 'px';
  }};
  display: ${({ offset }) => (offset?.width > 0 ? 'flex' : 'none')};
  flex-direction: column;
`;

export const EditorBarLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2px 4px;
  &:first-child {
    border-bottom: 1px solid #ededed;
  }
  div {
    display: flex;
    align-items: center;
    gap: 2px;
  }
`;

export const EditorBarButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  background: ${({ isSelected }) => (isSelected ? '#E6E6E6' : '#fff')};
  height: 32px;
  min-width: 32px;
  width: fit-content;
  white-space: nowrap;
`;

export const FontSelector = styled.div`
  position: relative;
  z-index: 1000;
`;
export const FontsList = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  border-radius: 4px;
  top: 39px;
  width: 100px;
  background: #fff;
  box-shadow: 0px 0px 5px 0px rgba(34, 60, 80, 0.1);
  padding: 4px;
`;

export const FontsListButton = styled.div`
  padding: 7px;
  border-radius: 4px;
  cursor: pointer;
  background: ${({ isSelected }) => (isSelected ? '#E6E6E6' : '#fff')};
  width: 92px;
  white-space: nowrap;
`;
