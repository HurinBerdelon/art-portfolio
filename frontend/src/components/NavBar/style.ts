import styled from "styled-components"

export const Container = styled.aside`
	display: none;
	background: ${(props) => props.theme.colors.boxOne};
    color: ${(props) => props.theme.colors.textOne};
	padding: 1rem;

	.sectionHeader {
		display: flex;
		flex-direction: column;
		margin-top: 3rem;
		
		img {
			width: 180px;
			align-self: center;
		}
		
		h2 {
			max-width: 200px;
			text-align: center;
			margin-top: 1rem;
		}
	}	


	@media (min-width: 720px) {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
	}
`
