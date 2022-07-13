import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: ${(props) => props.theme.fontSizes.xl};
  }
`

export const HistoryListWrapper = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;
  max-height: 460px;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${(props) => props.theme.colors['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme.colors['gray-100']};
      font-size: ${(props) => props.theme.fontSizes.sm};
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme.colors['gray-700']};
      border-top: 4px solid ${(props) => props.theme.colors['gray-800']};
      padding: 1rem;
      font-size: ${(props) => props.theme.fontSizes.sm};
      line-height: 1.6;

      &:first-child {
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`
