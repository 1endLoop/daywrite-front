// 공통 css를 변수로 사용하기 위한 common.js
import { css } from "styled-components";

export const flexCenterRow = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const justifyContentLeft = css`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
`

export const flexCenterColumn = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const justifyContentStart = css`
  justify-content: start;
  align-items: center;
  display: inline-flex;
`

export const justifyContentCenter = css`
  justify-content: center;
  align-items: center;
  display: inline-flex;
`