import { gql, useMutation } from "@apollo/client";
import dayjs from "dayjs";
import { Form, Formik, FormikValues } from "formik";
import { useEffect, useState } from "react";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useArts } from "../../../../hooks/useArts";
import { ArtSchema, createArtSchemas } from "../../../../schemas/Art";
import { revalidateSSG } from "../../../../services/revalidate";
import { toastError, toastSuccess } from "../../../../services/toastProvider";
import { DropImage } from "../../ArtForms/DropImage";
import { InputZone } from "../../ArtForms/InputZone";
import { Container } from "./style";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const UPDATE_ART = gql`
    mutation(
        $id: String!,
        $category: String!
        $uniqueCode: String!,
        $description: String!,
        $dimension: String!,
        $title: String!,
        $productionDate: DateTime!
        ) {
            updateArt(
                id: $id,
                uniqueCode: $uniqueCode, 
                category: $category
                description: $description, 
                dimension: $dimension, 
                title: $title,
                productionDate: $productionDate){
                    id,
                    title,
                    uniqueCode,
                    categoryTitle,
                    description,
                    dimension,
                    image,
                    productionDate,
                }
        }`

const UPDATE_ART_IMAGE = gql`
    mutation(
        $id: String!,
        $file: Upload!
        ) {
            updateArtImage(
                id: $id,
                file: $file) {
                    id,
                    title,
                    uniqueCode,
                    categoryTitle,
                    description,
                    dimension,
                    image,
                    productionDate,
                }
        }`

interface UpdateArtProps {
    onRequestClose(): void
    art: ArtSchema
    setIsCardFlipped(isCardFlipped: boolean): void
}

export function UpdateArt({ art, onRequestClose, setIsCardFlipped }: UpdateArtProps): JSX.Element {

    const { arts, setArts } = useArts()
    const [updateArt] = useMutation(UPDATE_ART, { fetchPolicy: "no-cache" })
    const [updateArtImage] = useMutation(UPDATE_ART_IMAGE, { fetchPolicy: "no-cache" })
    const [preview, setPreview] = useState<string>()
    const { t } = useTranslation()
    const { locale } = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const { saveArtYupSchema, updateArtYupSchema } = createArtSchemas(locale)

    function createPreview() {
        setPreview(art.image)
    }

    useEffect(() => {
        createPreview()

    }, [art, onRequestClose])

    const handleSubmitForm = (values: FormikValues) => {

        setIsLoading(true)

        function sortArtsByDate(newArt: ArtSchema) {

            const tempArts = [...arts]
            const oldArt = arts.find(art => art.id === newArt.id)
            tempArts.splice(tempArts.indexOf(oldArt), 1, newArt)
            tempArts.sort((a, b) => {
                if (a.productionDate < b.productionDate) return 1
                else if (a.productionDate > b.productionDate) return -1
                return 0
            })
            setArts(tempArts)
        }

        if (values.file) {
            updateArtImage({
                variables: {
                    id: art.id,
                    file: values.file
                }
            }).then((response) => {
                sortArtsByDate(response.data.updateArtImage)
                toastSuccess(`${values.title}'s image has been updated`)
            }).catch((error) => {
                setIsLoading(false)
                toastError('Something went wrong, please try again')
                console.log(error.message)
            })

        }

        updateArt({
            variables: {
                id: art.id,
                category: values.categoryTitle,
                uniqueCode: values.uniqueCode,
                description: values.description,
                dimension: values.dimension,
                title: values.title,
                productionDate: values.productionDate
            }
        }).then((response) => {
            if (values.category !== art.categoryTitle) {
                revalidateSSG({ path: values.categoryTitle })
            }
            revalidateSSG({ path: art.categoryTitle })
            revalidateSSG({ path: '' })
            sortArtsByDate(response.data.updateArt)
            toastSuccess(`${values.title} has been updated`)
            onRequestClose()
        }).catch((error) => {
            toastError('Something went wrong, please try again')
            console.log(error)
        }).finally(() => setIsLoading(false))
    }

    const initialValues = {
        file: '',
        categoryTitle: art.categoryTitle,
        uniqueCode: art.uniqueCode,
        description: art.description,
        dimension: art.dimension,
        title: art.title,
        productionDate: dayjs(art.productionDate).format('YYYY-MM-DD')
    }

    return (
        <Container>
            <h2>{t('admin:updateArt')}</h2>
            <Formik
                initialValues={initialValues}
                onSubmit={values => handleSubmitForm(values)}
                validationSchema={preview ? updateArtYupSchema : saveArtYupSchema}
            >
                {({ errors, setFieldValue }) => (
                    <Form>
                        <DropImage
                            errors={errors}
                            setFieldValue={setFieldValue}
                            preview={preview}
                            setPreview={setPreview}
                            createPreview={() => {
                                setFieldValue('file', '')
                                createPreview()
                            }}
                        />
                        <InputZone
                            initialValues={initialValues}
                            errors={errors}
                            setFieldValue={setFieldValue}
                            isLoading={isLoading}
                        />
                    </Form>
                )}
            </Formik>
            <button
                className="delete"
                onClick={() => setIsCardFlipped(true)}
            >
                {t('admin:deleteArt')}
                <ArrowRightAltIcon />
            </button>
        </Container>
    )
}