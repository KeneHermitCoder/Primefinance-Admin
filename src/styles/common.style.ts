// import { lighten } from 'polished';
import styled from "styled-components";

export const Container = styled.div`
  background: #000;
`;

// export const CategoryTab = styled.div`
//     min-width: ${(props) => props.ww(props.w ?? '')}px;
//     width: ${(props) => typeof props.w === 'number' ? `${props.ww(props.w)}px` : props.w === 'full' ? '100%' : props.w};
//     margin-left: ${props => props.ml};
//     &.active {
//         background-color: #100f0e;
//         > div {
//             color: #d0d4dc;
//             border-top-left-radius: ${props => props.ww(8)}px;
//             border-top-right-radius: ${props => props.ww(8)}px;
//             background-color: black;
//             &:hover {
//                 background-color: ${lighten(0.09991, 'black')};
//             };
//         };
//     };
//     &.before-active {
//         > div {
//             border-bottom-right-radius: ${props => props.ww(5)}px;
//             background-color: #100f0e;
//             &:hover {
//                 background-color: ${lighten(0.09991, '#100f0e')};
//             };
//         };
//     };
//     &.after-active {
//         > div {
//             border-bottom-left-radius: ${props => props.ww(5)}px;
//             background-color: #100f0e;
//             &:hover {
//                 background-color: ${lighten(0.09991, '#100f0e')};
//             };
//         }
//     }
// `;