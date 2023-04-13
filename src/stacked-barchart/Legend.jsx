import styled from 'styled-components';

const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  color: #c1d1cf;
  height: 100%;
  width: 40%;
  font-family: sans-serif;
  font-size: 1.9vh;
  margin-right: 30px;
  justify-content: center;
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 10%;
  cursor: default;
`;

const StyledHeaderItem = styled.div`
  display: flex;
  align-items: center;
  background: #253038;
  height: 100%;
  border-bottom: 1px solid #c1d1cf21;
  box-sizing: border-box;
  :nth-child(1) {
    padding-left: 5%;
    width: 40%;
    box-shadow: 2px 0px 2px 0px #1111118a;
    z-index: 2;
  }
  :nth-child(2) {
    justify-content: center;
    width: 30%;
    z-index: 1;
    box-shadow: 2px 0px 2px 0px #1111118a;
  }
  :nth-child(3) {
    justify-content: center;
    width: 30%;
  }
`;

const StyledRowContainer = styled(StyledHeaderContainer)`
  height: 7.5%;
  .child {
    background: ${({ highlight }) => highlight};
  }
  &:hover .child {
    background: #2f3b46;
  }
`;

const StyledRowItem = styled(StyledHeaderItem)`
  :nth-child(1) {
    box-shadow: 3px 0px 3px 0px #1111118a;
    padding-left: 0%;
  }
  :nth-child(2) {
    box-shadow: none;
    justify-content: end;
    padding-right: 5%;
  }
  :nth-child(3) {
    justify-content: end;
    padding-right: 5%;
  }
`;

const StyledIndexBar = styled.div`
  min-width: 4%;
  height: 90%;
  background: ${(props) => props.color};
  margin-right: 5%;
`;

const Legend = ({ data, colorOrder, activeSubgroup, tableHeaders }) => {
  const tableHighlightColor = '#2f3b46';
  const tableColor = '#1d262c';

  return (
    <StyledContainer>
      <StyledHeaderContainer>
        {tableHeaders.map((header) => (
          <StyledHeaderItem>{header}</StyledHeaderItem>
        ))}
      </StyledHeaderContainer>

      {data.map((subgroup, index) => (
        <StyledRowContainer
          key={`${subgroup.name}-${index}`}
          className="legendRow"
          id={subgroup.name}
          highlight={
            activeSubgroup === subgroup.name ? tableHighlightColor : tableColor
          }
        >
          <StyledRowItem className="child" id={subgroup.name}>
            <StyledIndexBar color={colorOrder[index]} /> {subgroup.name}
          </StyledRowItem>
          <StyledRowItem className="child" id={subgroup.name}>
            {subgroup.percent}
          </StyledRowItem>
          <StyledRowItem className="child" id={subgroup.name}>
            {subgroup.total}
          </StyledRowItem>
        </StyledRowContainer>
      ))}
    </StyledContainer>
  );
};
export default Legend;
