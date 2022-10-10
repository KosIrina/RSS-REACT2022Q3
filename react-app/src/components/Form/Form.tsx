import React, { ChangeEvent, createRef } from 'react';
import './Form.css';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import Select from '../../components/UI/Select';
import { IFormProps, Numbers, IFormState } from '../../types';
import {
  CHARACTER_GENDER,
  CHARACTER_STATUS,
  EMPTY_STRING,
  FORM_SELECT_OPTIONS,
  FORM_SELECT_VALUES,
  ONE_SECOND,
} from '../../constants';

class Form extends React.Component<IFormProps, IFormState> {
  nameInput: React.RefObject<HTMLInputElement>;
  statusInput: React.RefObject<HTMLInputElement>;
  speciesSelect: React.RefObject<HTMLSelectElement>;
  genderInput: React.RefObject<HTMLInputElement>;
  birthDateInput: React.RefObject<HTMLInputElement>;
  imageInput: React.RefObject<HTMLInputElement>;
  agreeInput: React.RefObject<HTMLInputElement>;

  constructor(props: IFormProps) {
    super(props);
    this.nameInput = createRef();
    this.statusInput = createRef();
    this.speciesSelect = createRef();
    this.genderInput = createRef();
    this.birthDateInput = createRef();
    this.imageInput = createRef();
    this.agreeInput = createRef();
    this.state = {
      buttonIsDisabled: true,
      name: true,
      species: true,
      birthday: true,
      avatar: true,
      agreement: true,
      showMessage: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
    this.setState(
      (state): IFormState => ({
        ...state,
        [`${event.target.id}`]: true,
      }),
      this.enableButton
    );
  }

  enableButton(): void {
    if (
      this.state.name &&
      this.state.species &&
      this.state.birthday &&
      this.state.avatar &&
      this.state.agreement
    ) {
      this.setState(
        (state): IFormState => ({
          ...state,
          buttonIsDisabled: false,
        })
      );
    }
  }

  validateElement(condition: boolean, element: string): boolean {
    if (condition) {
      this.setState(
        (state): IFormState => ({
          ...state,
          [element]: true,
        })
      );
      return true;
    }
    this.setState(
      (state): IFormState => ({
        ...state,
        [element]: false,
      })
    );
    return false;
  }

  validateAll(): boolean {
    let isValid = true;
    if (this.nameInput && this.nameInput.current) {
      isValid =
        this.validateElement(this.nameInput.current.value.trim().length > Numbers.One, 'name') &&
        isValid;
    }
    if (this.speciesSelect && this.speciesSelect.current) {
      isValid = this.validateElement(!!this.speciesSelect.current.value, 'species') && isValid;
    }
    if (this.birthDateInput && this.birthDateInput.current) {
      isValid = this.validateElement(!!this.birthDateInput.current.value, 'birthday') && isValid;
    }
    if (this.imageInput && this.imageInput.current && this.imageInput.current.files) {
      isValid = this.validateElement(!!this.imageInput.current.files.length, 'avatar') && isValid;
    }
    if (this.agreeInput && this.agreeInput.current) {
      isValid = this.validateElement(this.agreeInput.current.checked, 'agreement') && isValid;
    }
    return isValid;
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!this.validateAll()) {
      this.setState(
        (state): IFormState => ({
          ...state,
          buttonIsDisabled: true,
        })
      );
      return;
    }
    if (
      this.nameInput &&
      this.nameInput.current &&
      this.statusInput &&
      this.statusInput.current &&
      this.speciesSelect &&
      this.speciesSelect.current &&
      this.genderInput &&
      this.genderInput.current &&
      this.birthDateInput &&
      this.birthDateInput.current &&
      this.imageInput &&
      this.imageInput.current &&
      this.imageInput.current.files &&
      this.imageInput.current.files.length &&
      this.agreeInput &&
      this.agreeInput.current
    ) {
      this.props.addNewCard({
        id: Date.now(),
        name: this.nameInput.current.value,
        status: this.statusInput.current.checked ? CHARACTER_STATUS.dead : CHARACTER_STATUS.alive,
        species: `${this.speciesSelect.current.value[
          Numbers.Zero
        ].toUpperCase()}${this.speciesSelect.current.value.slice(Numbers.One)}`,
        gender: this.genderInput.current.checked ? CHARACTER_GENDER.female : CHARACTER_GENDER.male,
        birthDate: this.birthDateInput.current.value,
        avatar: URL.createObjectURL(this.imageInput.current.files[Numbers.Zero]),
      });
      this.setState(
        (state): IFormState => ({
          ...state,
          showMessage: true,
        })
      );
      setTimeout((): void => {
        this.setState(
          (state): IFormState => ({
            ...state,
            showMessage: false,
          })
        );
      }, ONE_SECOND);
      this.resetForm();
    }
  }

  resetForm(): void {
    if (this.nameInput && this.nameInput.current) {
      this.nameInput.current.value = EMPTY_STRING;
      this.setState(
        (state): IFormState => ({
          ...state,
          name: true,
        })
      );
    }
    if (this.statusInput && this.statusInput.current) {
      this.statusInput.current.checked = false;
    }
    if (this.speciesSelect && this.speciesSelect.current) {
      this.speciesSelect.current.value = EMPTY_STRING;
      this.setState(
        (state): IFormState => ({
          ...state,
          species: true,
        })
      );
    }
    if (this.genderInput && this.genderInput.current) {
      this.genderInput.current.checked = false;
    }
    if (this.birthDateInput && this.birthDateInput.current) {
      this.birthDateInput.current.value = EMPTY_STRING;
      this.setState(
        (state): IFormState => ({
          ...state,
          birthday: true,
        })
      );
    }
    if (this.imageInput && this.imageInput.current) {
      this.imageInput.current.value = EMPTY_STRING;
      this.setState(
        (state): IFormState => ({
          ...state,
          avatar: true,
        })
      );
    }
    if (this.agreeInput && this.agreeInput.current) {
      this.agreeInput.current.checked = false;
      this.setState(
        (state): IFormState => ({
          ...state,
          agreement: true,
        })
      );
    }
    this.setState(
      (state): IFormState => ({
        ...state,
        buttonIsDisabled: true,
      })
    );
  }

  render(): JSX.Element {
    return (
      <>
        <form
          className="main-page__submit-form submit-form"
          onSubmit={this.handleSubmit}
          data-testid="submit-form"
        >
          <Input
            classes={{
              container: 'submit-form__item name-container',
              label: 'name-container__label submit-form__label',
              input: 'name-container__input submit-form__input',
              error: 'name-container__error submit-form__error',
            }}
            id="name"
            type="text"
            label="Name:"
            errorMessage="Name should contain at least 2 chars"
            reference={this.nameInput}
            isValid={this.state.name}
            onChange={this.handleChange}
          />

          <Input
            classes={{
              container: 'submit-form__item status-container',
              label: 'status-container__label submit-form__label',
              input: 'status-container__input submit-form__input',
              error: 'status-container__error submit-form__error',
            }}
            id="status"
            type="checkbox"
            switcher={true}
            reference={this.statusInput}
            onChange={this.handleChange}
            testid="status-input"
          />

          <Select
            classes={{
              container: 'submit-form__item species-container',
              label: 'species-container__label submit-form__label',
              select: 'species-container__select submit-form__select',
              option: 'species-container__option',
              error: 'species-container__error submit-form__error',
            }}
            id="species"
            values={FORM_SELECT_VALUES}
            options={FORM_SELECT_OPTIONS}
            label="Species:"
            errorMessage="Species should be selected"
            reference={this.speciesSelect}
            isValid={this.state.species}
            onChange={this.handleChange}
          />

          <Input
            classes={{
              container: 'submit-form__item gender-container',
              label: 'gender-container__label submit-form__label',
              input: 'gender-container__input submit-form__input',
              error: 'gender-container__error submit-form__error',
            }}
            id="gender"
            type="checkbox"
            switcher={true}
            reference={this.genderInput}
            onChange={this.handleChange}
            testid="gender-input"
          />

          <Input
            classes={{
              container: 'submit-form__item birth-date-container',
              label: 'birth-date-container__label submit-form__label',
              input: 'birth-date-container__input submit-form__input',
              error: 'birth-date-container__error submit-form__error',
            }}
            id="birthday"
            type="date"
            label="Birth date:"
            errorMessage="Birth date should be selected"
            reference={this.birthDateInput}
            isValid={this.state.birthday}
            onChange={this.handleChange}
          />

          <Input
            classes={{
              container: 'submit-form__item image-container',
              label: 'image-container__label submit-form__label',
              input: 'image-container__input submit-form__input',
              error: 'image-container__error submit-form__error',
            }}
            id="avatar"
            type="file"
            label="Photo:"
            errorMessage="Photo should be uploaded"
            accept=".jpg, .jpeg, .png"
            reference={this.imageInput}
            isValid={this.state.avatar}
            onChange={this.handleChange}
            testid="file-input"
          />

          <Input
            classes={{
              container: 'submit-form__item agreement-container',
              label: 'agreement-container__label submit-form__label',
              input: 'agreement-container__input submit-form__input',
              error: 'agreement-container__error submit-form__error',
            }}
            id="agreement"
            type="checkbox"
            label="I agree to create a custom character"
            errorMessage="You should agree to create a character"
            reference={this.agreeInput}
            isValid={this.state.agreement}
            onChange={this.handleChange}
            testid="agree-input"
          />

          <Button
            classes={{
              container: 'submit-form__item button-container',
              button: 'button-container__button',
              message: 'button-container__message submit-form__message',
            }}
            type="submit"
            buttonText="Create character"
            isDisabled={this.state.buttonIsDisabled}
            message="A new character successfully created!"
            showMessage={this.state.showMessage}
          />
        </form>
      </>
    );
  }
}

export default Form;
