import { useState } from 'react';
import { useRouter } from 'next/router';

import UserForm from '@Components/UserForm';
import Auth from '@Services/auth';
import Link from '@Components/Links/Link';
import VerifyIdentity from './sections/VerifyIdentity';
import SuccessRegister from './sections/SuccessRegister';

const Register = () => {
  const [stepRegister, setStepRegister] = useState<1 | 2 | 3>(1);
  const [personId, setPersonId] = useState<string>(undefined);

  const router = useRouter();

  const onSuccessUserForm = ({ personId }: { personId: string }) => {
    setPersonId(personId);
    // mostramos el compoente para rel reconociemiento facial
    setStepRegister(2);
  };

  const onErrorUserForm = () => {
    console.error('error');
  };

  const onSuccessVerifyIdentity = () => {
    setStepRegister(3);
  };

  const onSuccess = () => {
    router.push('/home');
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-96 h-auto box-border px-4 sm:px-0 flex flex-col items-center">
        <p className="text-white font-extrabold text-4xl py-4">Únete :D</p>
        {stepRegister === 1 && (
          <>
            <p className="text-white font-normal text-base py-1 text-center">
              <strong className="font-extrabold">Paso 1</strong>: Crea un nombre
              de usuario
            </p>
            <div className="min-w-0 w-full max-w-xs">
              <UserForm
                mutation={Auth.AddUser}
                typeForm="register"
                onSuccess={onSuccessUserForm}
                onError={onErrorUserForm}
              />
            </div>
          </>
        )}
        {stepRegister === 2 && personId && (
          <VerifyIdentity
            onSuccess={onSuccessVerifyIdentity}
            personId={personId}
          />
        )}
        {stepRegister === 3 && <SuccessRegister onSuccess={onSuccess} />}
        <div className="mt-5">
          <span className="text-white text-xs">
            ¿Ya tienes una cuenta?
            <Link
              href={'/login'}
              className="text-green-500 font-semibold ml-2"
              text="iniciar sesión"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
