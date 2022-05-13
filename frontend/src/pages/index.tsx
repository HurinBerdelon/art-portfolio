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

	const [currentPage, setCurrentPage] = useState('home')

	return (
		<>
			<Head>
				<title>Home | HurinBerdelon</title>
			</Head>
			<NavBar
			// currentPage={currentPage} setCurrentPage={setCurrentPage} 
			/>
			<Gallery arts={arts} />
			{/* <UploadForm /> */}
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {

	const { data } = await apolloClient.query({
		query: gql`
        query Arts {
            arts {
                id
                title
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
}