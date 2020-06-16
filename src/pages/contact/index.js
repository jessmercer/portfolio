import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';

import ErrorMessage from '../../components/error-message';
import TextInput from '../../components/text-input';
import Textarea from '../../components/textarea';
import Loader from '../../components/loader';
import Link from '../../components/link';
import Text from '../../components/text';
import Wrapper from '../../components/wrapper';
import Submit from '../../components/submit';

import { requestContact } from '../../redux/contact/actions';
import contactSelectors from '../../redux/contact/selectors';

import styles from './index.module.css';

export default () => {
  const dispatch = useDispatch();

  const {
    isInitial: isContactInitial,
    isPending: isContactPending,
    hasError: hasContactError
  } = useSelector(contactSelectors.getPredicate);

  const { description, number, email } = useSelector(
    contactSelectors.getSimple
  );

  useEffect(() => {
    dispatch(requestContact());
  }, [dispatch]);

  if (hasContactError) {
    return (
      <ErrorMessage>
        Oops, something went wrong with loading the contact page.
      </ErrorMessage>
    );
  }

  if (isContactInitial || isContactPending) {
    return <Loader />;
  }

  return (
    <div className={styles.contact}>
      <Wrapper>
        <div className={styles.description}>
          <Text style={Text.styles.large} dataId="description">
            {description}
          </Text>
        </div>
        <div>
          <div className={styles.number}>
            <Text style={Text.styles.medium} dataId="number">
              <Link to={`tel:${number}`} isAnchor>
                {number}
              </Link>
            </Text>
          </div>
          <div className={styles.email}>
            <Text style={Text.styles.medium} dataId="email">
              <Link to={'mailto:' + email} isAnchor>
                {email}
              </Link>
            </Text>
          </div>
        </div>

        <Form
          onSubmit={(values) => console.log(values)}
          render={(formProps) => (
            <form onSubmit={formProps.handleSubmit} className={styles.form}>
              <div className={styles.formInput}>
                <Field
                  name="fullname"
                  validate={(value) => (value ? false : 'Name required')}
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
                        type={TextInput.types.email}
                      />
                    </Fragment>
                  )}
                </Field>
              </div>
              <div className={styles.formInput}>
                <Field
                  name="email"
                  validate={(value) => (value ? false : 'Email required')}
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

              <Submit isDisabled={formProps.invalid && formProps.submitFailed}>
                Submit
              </Submit>

              {formProps.invalid &&
                formProps.submitFailed &&
                Object.values(formProps.errors).map((error) => (
                  <div key={error}>{error}</div>
                ))}
            </form>
          )}
        />
      </Wrapper>
    </div>
  );
};
