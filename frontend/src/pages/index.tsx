import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";
import { Gallery } from "../components/Gallery";
import { NavBar } from "../components/NavBar";
import { ArtSchema } from "../schemas/Art";
import { apolloClient } from "../services/apolloClient";

interface HomeProps {
	arts: ArtSchema[]
}

export default function Home({ arts }: HomeProps) {

	const [artsOnScreen, setArtsOnScreen] = useState(arts)

	return (
		<>
			<Head>
				<title>Home | HurinBerdelon</title>
			</Head>
			<NavBar />
			<Gallery arts={artsOnScreen} />
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {

	try {
		const { data } = await apolloClient.query({
			query: gql`
        query Arts {
            arts {
                id
                title
				category
                description
                image 
                dimension
                uniqueCode
                productionDate
            }
        }
    `
		})

		return {
			props: {
				arts: data.arts
			},
			revalidate: 60 * 60 * 24 // = 24 hours
		}
	} catch (error) {

		return {
			props: {
				arts: [],
				error: error.message
			}
		}
	}
}