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
			font-size: 2rem;
			margin-top: 1rem;
		}
	}	


	@media (min-width: 1024px) {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
	}

	@media (min-width: 1024px) {

		.sectionHeader {
			margin-top: 0.5rem;

			h2 {
				margin-top: 0.5rem;
			}
		}

	}

	@media (min-width: 1320px) {

		.sectionHeader {
			margin-top: 1.25rem;
		}
	}
`
