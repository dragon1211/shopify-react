import { render } from "react-dom";
import React, { FC, useState } from 'react'
import { Formik, Form, Field,  } from 'formik';
import * as Yup from 'yup';
import { 
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Box,
    Input,
    Button,
} from "@chakra-ui/react"

interface SurveyFormInputProps {
    reason: string,
}

const SurveyFormSchema: Yup.SchemaOf<SurveyFormInputProps> = Yup.object().shape({
    reason: Yup.string()
      .required('この項目は必須です。'),
  });
  
  interface SurveyFormProps {
      submitHandler: (arg: {reason: string}) => void
  }
  const SurveyForm: FC<SurveyFormProps> = ({submitHandler}) => {
    const postInputAttr = [
        {name: 'reason', type: 'string', label: '理由', placeholder: '阻止理由を記入してください', size: "container.xl" },
    ]
    return (
      <Formik
          initialValues={{ reason: ''}}
          validationSchema={SurveyFormSchema}
          onSubmit={submitHandler}
      >
      {({errors, touched, isSubmitting}) => (
          <Form>
              <Flex wrap="wrap">
                  {postInputAttr.map((attr, i) =>
                      <Box key={i} w={attr.size} mr="10">
                          <Field name={attr.name}>
                              {({ field }: {field: {name: string, value: string}}) => (
                                  <FormControl isInvalid={!!(errors[attr.name as keyof SurveyFormInputProps] && touched[attr.name as keyof SurveyFormInputProps])} mb="3">
                                      <FormLabel id={`post-${attr.name}`} htmlFor={`post-${attr.name}`} >{attr.label}</FormLabel>
                                      <Input 
                                          {...field}
                                          id={`post-${attr.name}`}
                                          placeholder={attr.placeholder}
                                          bg={'gray.100'}
                                          border={0}
                                          color={'gray.500'}
                                          type={attr.type}
                                          _placeholder={{
                                              color: 'gray.500',
                                          }}
                                      />
                                      <FormErrorMessage>{errors[attr.name as keyof SurveyFormInputProps]}</FormErrorMessage>
                                  </FormControl>
                              )}
                          </Field>
                      </Box>
                  )}
              </Flex>
              <Button
                variant="primary"
                isLoading={isSubmitting}
                type="submit"
              >
                  解約
              </Button>
          </Form>
          )}
      </Formik>
    )
}

export default SurveyForm