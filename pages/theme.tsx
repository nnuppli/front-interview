import { createGlobalStyle } from 'styled-components';

const AlternateStyle = createGlobalStyle`
    .loader {
        background-color: red;
        height: 100%;
        position: fixed;
        width: 100%;
        z-index: 1000;
    }
`;

export default AlternateStyle;
