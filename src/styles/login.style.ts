import styled from "styled-components";

export const LoginForm = styled.div`
	background: #080604;
	width: ${(props) => `${props.ww(1440)}px`};
	display: flex;
	justify-content: center;
	form {
		width: ${(props) => `${props.ww(1116)}px`};
		min-height: 100vh;
		background: rgba(195, 173, 96, 0.03);
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: ${(props) => `${props.ww(20)}px`};
		.circle {
			width: ${(props) => `${props.ww(200)}px`};
			height: ${(props) => `${props.ww(200)}px`};
			border: 4px solid #c3ad60;
			border-radius: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			img {
			}
		}
		.head_txt {
			font-weight: 800;
			font-size: ${(props) => `${props.ww(35)}px`};
			margin-top: ${(props) => `${props.ww(22)}px`};
			line-height: 120%;
			color: #c3ad60;
			margin-bottom: ${(props) => `${props.ww(74)}px`};
		}
		.form-group {
			margin-top: ${(props) => `${props.ww(29)}px`};
			.form-input {
				width: ${(props) => `${props.ww(300)}px`};
				height: ${(props) => `${props.ww(48)}px`};
				background: #1b1918;
				border: 1.5px solid #262a32;
				border-radius: 4px;
			}
		}

		.button {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: ${(props) => `${props.ww(10)}px`};
			width: ${(props) => `${props.ww(300)}px`};
			height: ${(props) => `${props.ww(52)}px`};
			background: #c3ad60;
			border-radius: 9px;
			margin-top: ${(props) => `${props.ww(29)}px`};
		}
	}
`;