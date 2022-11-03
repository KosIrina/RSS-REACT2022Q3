import React, { useContext, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './Form.css';
import './Input.css';
import Button from '../../components/UI/Button';
import { AppContext } from '../../state/AppState';
import { Numbers, IFormValues, ICustomDataElement, FormErrors } from '../../types';
import {
  CHARACTER_GENDER,
  CHARACTER_STATUS,
  EMPTY_STRING,
  FORM_SELECT_OPTIONS,
  FORM_SELECT_VALUES,
  ONE_SECOND,
  REDUCER_ACTION_TYPES,
} from '../../constants';

const Form = (): JSX.Element => {
  const {
    state: { formPage },
    dispatch,
  } = useContext(AppContext);

  const {
    register,
    formState: { errors, isDirty, isSubmitSuccessful },
    handleSubmit,
    reset,
    setValue,
    getValues,
    trigger,
  } = useForm<IFormValues>({
    mode: formPage.hasErrors ? 'onChange' : 'onSubmit',
    defaultValues: {
      name: EMPTY_STRING,
      status: false,
      species: EMPTY_STRING,
      gender: false,
      birthday: EMPTY_STRING,
      agreement: false,
      avatar: null,
    },
  });

  const onSubmit: SubmitHandler<IFormValues> = (data): void => {
    const newCustomCard: ICustomDataElement = {
      id: self.crypto.randomUUID(),
      name: data.name,
      status: data.status ? CHARACTER_STATUS.dead : CHARACTER_STATUS.alive,
      species: `${data.species[Numbers.Zero].toUpperCase()}${data.species.slice(Numbers.One)}`,
      gender: data.gender ? CHARACTER_GENDER.female : CHARACTER_GENDER.male,
      birthDate: data.birthday,
      avatar: data.avatar ? URL.createObjectURL(data.avatar[Numbers.Zero]) : EMPTY_STRING,
    };
    dispatch({
      type: REDUCER_ACTION_TYPES.updateCustomCards,
      payload: newCustomCard,
    });
    dispatch({
      type: REDUCER_ACTION_TYPES.updateFormErrors,
      payload: false,
    });
    setTimeout((): void => {
      reset();
    }, ONE_SECOND);
  };

  const onError: SubmitHandler<FormErrors> = (): void => {
    dispatch({
      type: REDUCER_ACTION_TYPES.updateFormErrors,
      payload: true,
    });
  };

  useEffect((): VoidFunction => {
    if (formPage.hasErrors) {
      trigger();
    }
    setValue('name', formPage.name, { shouldDirty: true });
    setValue('status', formPage.status, { shouldDirty: true });
    setValue('species', formPage.species, { shouldDirty: true });
    setValue('gender', formPage.gender, { shouldDirty: true });
    setValue('birthday', formPage.birthday, { shouldDirty: true });
    setValue('agreement', formPage.agreement, { shouldDirty: true });

    return (): void => {
      dispatch({
        type: REDUCER_ACTION_TYPES.updateFormValues,
        payload: {
          name: getValues('name'),
          status: getValues('status'),
          species: getValues('species'),
          gender: getValues('gender'),
          birthday: getValues('birthday'),
          avatar: getValues('avatar'),
          agreement: getValues('agreement'),
        },
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, getValues, setValue, trigger]);

  return (
    <>
      <form
        className="main-page__submit-form submit-form"
        onSubmit={handleSubmit(onSubmit, onError)}
        data-testid="submit-form"
      >
        <div className="submit-form__item name-container">
          <label htmlFor="name" className="name-container__label submit-form__label">
            Name:
            <input
              type="text"
              id="name"
              className="name-container__input submit-form__input"
              {...register('name', {
                required: 'Name should contain at least 2 chars',
                minLength: { value: Numbers.Two, message: 'Name should contain at least 2 chars' },
              })}
            />
          </label>
          {errors?.name && (
            <span className="name-container__error submit-form__error">
              {errors?.name?.message}
            </span>
          )}
        </div>

        <div className="submit-form__item status-container">
          <label htmlFor="status" className="status-container__label submit-form__label">
            <input
              type="checkbox"
              id="status"
              className="status-container__input submit-form__input"
              {...register('status')}
              data-testid="status-input"
            />
            <span className="swithcer-circle" />
          </label>
        </div>

        <div className="submit-form__item species-container">
          <label htmlFor="species" className="species-container__label submit-form__label">
            Species:
          </label>
          <select
            id="species"
            className="species-container__select submit-form__select"
            {...register('species', {
              required: 'Species should be selected',
            })}
          >
            {FORM_SELECT_VALUES.map((value: string, index: number): JSX.Element => {
              return (
                <option key={value} value={value} className="species-container__option">
                  {FORM_SELECT_OPTIONS[index]}
                </option>
              );
            })}
          </select>
          {errors?.species && (
            <span className="species-container__error submit-form__error">
              {errors?.species?.message}
            </span>
          )}
        </div>

        <div className="submit-form__item gender-container">
          <label htmlFor="gender" className="gender-container__label submit-form__label">
            <input
              type="checkbox"
              id="gender"
              className="gender-container__input submit-form__input"
              {...register('gender')}
              data-testid="gender-input"
            />
            <span className="swithcer-circle" />
          </label>
        </div>

        <div className="submit-form__item birth-date-container">
          <label htmlFor="birthday" className="birth-date-container__label submit-form__label">
            Birth date:
            <input
              type="date"
              id="birthday"
              className="birth-date-container__input submit-form__input"
              {...register('birthday', {
                required: 'Birth date should be selected',
              })}
            />
          </label>
          {errors?.birthday && (
            <span className="birth-date-container__error submit-form__error">
              {errors?.birthday?.message}
            </span>
          )}
        </div>

        <div className="submit-form__item image-container">
          <label htmlFor="avatar" className="image-container__label submit-form__label">
            Photo:
            <input
              type="file"
              id="avatar"
              accept=".jpg, .jpeg, .png"
              className="image-container__input submit-form__input"
              {...register('avatar', {
                required: 'Photo should be uploaded',
              })}
              data-testid="file-input"
            />
          </label>
          {errors?.avatar && (
            <span className="image-container__error submit-form__error">
              {errors?.avatar?.message}
            </span>
          )}
        </div>

        <div className="submit-form__item agreement-container">
          <label htmlFor="agreement" className="agreement-container__label submit-form__label">
            I agree to create a custom character
            <input
              type="checkbox"
              id="agreement"
              className="agreement-container__input submit-form__input"
              {...register('agreement', {
                required: 'You should agree to create a character',
              })}
              data-testid="agree-input"
            />
          </label>
          {errors?.agreement && (
            <span className="agreement-container__error submit-form__error">
              {errors?.agreement?.message}
            </span>
          )}
        </div>

        <Button
          classes={{
            container: 'submit-form__item button-container',
            button: 'button-container__button',
            message: 'button-container__message submit-form__message',
          }}
          type="submit"
          buttonText="Create character"
          isDisabled={
            !isDirty ||
            !!errors.agreement ||
            !!errors.avatar ||
            !!errors.birthday ||
            !!errors.name ||
            !!errors.species
          }
          message="A new character successfully created!"
          showMessage={isSubmitSuccessful}
        />
      </form>
    </>
  );
};

export default Form;
