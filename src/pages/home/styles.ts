import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const TaskFormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  flex-wrap: wrap;
`

type BaseInputProps = {
  isError?: boolean
}

const BaseInput = styled.input<BaseInputProps>`
  background: transparent;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme.colors['gray-500']};
  padding: 0.5rem 0.5rem 0.25rem;
  color: ${(props) => props.theme.colors['gray-100']};
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  border-color: ${(props) =>
    props.isError ? props.theme.colors['red-500'] : ''};

  &::placeholder {
    font-size: ${(props) => props.theme.fontSizes.lg};
    color: ${(props) => props.theme.colors['gray-500']};
    font-weight: ${(props) => props.theme.fontWeights.bold};
  }

  &:focus {
    box-shadow: none;
    border-color: ${({ isError, theme }) =>
      isError ? theme.colors['red-500'] : theme.colors['green-500']};
  }

  &:not(:placeholder-shown):focus {
    border-color: ${({ isError, theme }) =>
      isError ? theme.colors['red-500'] : theme.colors['gray-100']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinuteAmountInput = styled(BaseInput)`
  width: 4rem;

  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  text-align: center;
`

export const MinuteAmountInputPickerContainer = styled.div`
  position: relative;

  button {
    position: absolute;
    border: none;
    background: transparent;
    height: 1rem;
    width: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${(props) => props.theme.fontSizes.xl};
    color: ${(props) => props.theme.colors['gray-500']};
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: ${(props) => props.theme.colors['gray-100']};
    }

    &:focus {
      box-shadow: none;
    }

    &.left {
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }

    &.right {
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`

export const CountdownContainer = styled.div`
  font-family: ${(props) => props.theme.fontFamilies['roboto-mono']};
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme.colors['gray-100']};
  display: flex;
  gap: 1rem;

  span {
    background: ${(props) => props.theme.colors['gray-700']};
    padding: 2rem 1rem;
    border-radius: ${(props) => props.theme.radius.md};
  }

  span.separator {
    padding: 2rem 0;
    color: ${(props) => props.theme.colors['green-500']};
    width: 4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
    background: transparent;
  }
`

export const InputContainer = styled.div`
  position: relative;

  input {
    display: block;
  }

  small {
    position: absolute;
    font-size: ${(props) => props.theme.fontSizes.xs};
    color: ${(props) => props.theme.colors['red-500']};
    padding-top: 5px;
  }
`
