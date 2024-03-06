'use client'
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import applySpec from 'ramda/es/applySpec';
import fastDeepEqual from 'fast-deep-equal';

import { selectFromAppData } from '@/app/store/selectors/data';
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { ApiResponsePositions, FormFromLib, NewUser } from "@/app/store/types";
import { PhotoUpload } from '../PhotoUpload/PhotoUpload';
import { SuccessfullRegistration } from '../SuccessfullRegistration/SuccessfullRegistration';
import "./style.css";

type Selector = {
  positions: ApiResponsePositions,
  newUser: NewUser,
};

const selector = applySpec<Selector>({
  positions: selectFromAppData('positions', { success: false, positions: [] }),
  newUser: selectFromAppData('newUser', { success: false, user_id: 0, message: "" }),
});

export function Form() {
  const { positions } = useAppSelector<Selector>(selector, fastDeepEqual);
  const { newUser } = useAppSelector<Selector>(selector, fastDeepEqual);
  const allPositions = positions.positions
  const dispatch = useAppDispatch();
  const [fileSizeError, setFileSizeError] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<FormFromLib>();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [registrationError, setRegistrationError] = useState<string>('');

  useEffect(() => {
    dispatch({ type: 'actionType/getPositions' });
  }, []);

  useEffect(() => {
    if (newUser.success) {
      setIsRegistered(true);
      dispatch({ type: 'actionType/getAllUsers' });
      setTimeout(() => setIsRegistered(false), 10000);
    }
  }, [newUser]);

  useEffect(() => {
    const containsValue = Object.values(watch()).some(value => {
      return value !== null && value !== undefined && value !== "" && !(value instanceof FileList && value.length === 0);
    });

    if (Object.keys(errors).length > 0 || !containsValue || fileSizeError) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [errors, watch()]);

  const onSubmit: SubmitHandler<FormFromLib> = (data) => {
    const modifiedData = {
      ...data,
      position_id: +data.position_id,
      photo: data.photo ? data.photo[0] : null,
    }

    dispatch({ type: 'actionType/addUser', payload: modifiedData });

    if (newUser.success) {
      setIsRegistered(true);

      setValue('name', '');
      setValue('email', '');
      setValue('phone', '');
      setValue('position_id', 0);
      setValue('photo', null);
    } else {
      setRegistrationError(newUser.message)
    }
  }

  return (
    <>
      <section id='POST-request' className='global-pad'>
        <h2 className="title">Working with POST request</h2>
        <form className="form flex" onSubmit={handleSubmit(onSubmit)} noValidate>

          <div className="input-wrapper">
            <input
              className={`input-text ${errors.name ? 'error-color' : ''} ${watch('name')?.length ? 'filled' : ''}`}
              type="text"
              placeholder="Your name"
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Minimum length of your name is 2' },
                maxLength: { value: 60, message: 'Maximum length of your name is 60' },
              })}
            />
            <p className={`label-helper ${watch('name') ? 'active' : ''}`}>Your name</p>
            {errors.name && <span className="error">{errors.name.message}</span>}
          </div>

          <div className="input-wrapper">
            <input
              className={`input-text ${errors.email ? 'error-color' : ''} ${watch('email')?.length ? 'filled' : ''}`}
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required',
                minLength: { value: 2, message: 'Minimum length of your email is 2' },
                maxLength: { value: 100, message: 'Maximum length of your email is 100' },
                pattern: { value: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/, message: 'Invalid email address' }
              })}
            />
            <p className={`label-helper ${watch('email') ? 'active' : ''}`}>Email</p>
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>

          <div className="input-wrapper mb-20">
            <input
              className={`input-text ${errors.phone ? 'error-color' : ''} ${watch('phone')?.length ? 'filled' : ''}`}
              type="tel"
              placeholder="Phone"
              {...register('phone', {
                required: 'Phone is required',
                pattern: { value: /^[\+]{0,1}380([0-9]{9})$/, message: 'Invalid phone' }
              })}
            />
            <p className={`label-helper ${watch('phone') ? 'active' : ''}`}>Phone</p>
            {errors.phone
              ? <span className="error">{errors.phone.message}</span>
              : <p className="phone-helper">+38 (XXX) XXX - XX - XX</p>}
          </div>

          <div className="input-wrapper mb">
            <p className="input-title">Select your position</p>
            {allPositions && allPositions.map(position => (
              <div className="input-radio-wrapper flex" key={position.id}>
                <input
                  className="input-radio"
                  type="radio"
                  id={`${position.name}`}
                  value={position.id}
                  {...register('position_id', {
                    required: 'Please select a position',
                  })}
                />
                <label className="input-radio-label" htmlFor={`${position.name}`} tabIndex={0}>{position.name}</label>
              </div>
            ))}
            {errors.position_id && <span className="error">Please select a position</span>}
          </div>

          <PhotoUpload
            register={register}
            watch={watch}
            errors={errors}
            fileSizeError={fileSizeError}
            setFileSizeError={setFileSizeError}
          />

          <button
            className={`btn ${isDisabled ? 'disabled' : ''}`} type="submit"
            disabled={isDisabled}
          >
            Sign up
          </button>
          {registrationError && <p className='registrationError'>{registrationError}</p>}
        </form>
      </section>

      <SuccessfullRegistration isRegistered={isRegistered} />
    </>
  )
}
