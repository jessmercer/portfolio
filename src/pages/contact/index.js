import React, { Fragment, useState } from 'react';
import { Form, Field } from 'react-final-form';

import ErrorMessage from '../../components/error-message';
import Text from '../../components/text';
import TextInput from '../../components/text-input';
import Textarea from '../../components/textarea';
import Wrapper from '../../components/wrapper';
import Button from '../../components/button';
import isEmail from '../../lib/validation/is-email';
import isPhoneNumber from '../../lib/validation/is-phone-number';
import isRequired from '../../lib/validation/is-required';

import useMutation, { services } from '../../lib/hooks/use-mutation';

import styles from './index.module.css';

export default () => {
  const contactMutation = useMutation(services.contact);

  const [isResubmitting, setIsResubmitting] = useState(false);

  if (contactMutation.isError) {
    return (
      <ErrorMessage>
        Oops, something went wrong with loading the contact form.
      </ErrorMessage>
    );
  }

  return (
    <div className={styles.contact}>
      <Wrapper>
        {!contactMutation.isSuccess || isResubmitting ? (
          <Form
            onSubmit={(values) => {
              contactMutation.mutate({
                title: values.email,
                status: 'publish',
                fields: values
              });
              setIsResubmitting(false);
            }}
            render={(formProps) => (
              <form onSubmit={formProps.handleSubmit} className={styles.form}>
                <div className={styles.formInput}>
                  <Field
                    name="name"
                    validate={(value) => isRequired(value, 'Name is required')}
                  >
                    {({
                      meta: { valid, invalid, submitFailed },
                      input: { onChange, name }
                    }) => (
                      <Fragment>
                        <label htmlFor={name}>Full Name*</label>
                        <TextInput
                          isValid={valid}
                          isInvalid={invalid && submitFailed}
                          onChange={onChange}
                          name={name}
                        />
                      </Fragment>
                    )}
                  </Field>
                </div>
                <div className={styles.formInput}>
                  <Field
                    name="email"
                    validate={(value) =>
                      isRequired(value, 'Email is required') ||
                      isEmail(value, 'Please enter a valid email')
                    }
                  >
                    {({
                      meta: { valid, invalid, submitFailed },
                      input: { onChange, name }
                    }) => (
                      <Fragment>
                        <label htmlFor={name}>Email*</label>
                        <TextInput
                          isValid={valid}
                          isInvalid={invalid && submitFailed}
                          onChange={onChange}
                          name={name}
                          type={TextInput.types.email}
                        />
                      </Fragment>
                    )}
                  </Field>
                </div>
                <div className={styles.formInput}>
                  <Field
                    name="number"
                    validate={(value) =>
                      isPhoneNumber(value, 'Please enter a valid number')
                    }
                  >
                    {({
                      meta: { valid, invalid, submitFailed },
                      input: { onChange, name }
                    }) => (
                      <Fragment>
                        <label htmlFor={name}>Number</label>
                        <TextInput
                          isValid={valid}
                          isInvalid={invalid && submitFailed}
                          onChange={onChange}
                          name={name}
                        />
                      </Fragment>
                    )}
                  </Field>
                </div>
                <div className={styles.formInput}>
                  <Field name="message">
                    {({ input: { onChange, name } }) => (
                      <Fragment>
                        <label htmlFor={name}>Message</label>
                        <Textarea onChange={onChange} name={name} />
                      </Fragment>
                    )}
                  </Field>
                </div>

                <Button
                  isDisabled={formProps.invalid && formProps.submitFailed}
                  isLoading={contactMutation.isLoading}
                  type={Button.types.submit}
                >
                  Submit
                </Button>

                {formProps.invalid &&
                  formProps.submitFailed &&
                  Object.entries(formProps.errors).map(([key, value]) => (
                    <div key={key}>
                      <Text style={Text.styles.small} color={Text.colors.red}>
                        {value}
                      </Text>
                    </div>
                  ))}
              </form>
            )}
          />
        ) : (
          <div>
            <Text style={Text.styles.medium}>Thank you for your message.</Text>
            <Button onClick={() => setIsResubmitting(true)}>
              Send another
            </Button>
          </div>
        )}
      </Wrapper>
    </div>
  );
};
