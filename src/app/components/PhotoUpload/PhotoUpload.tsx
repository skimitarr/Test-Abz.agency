import { ChangeEvent } from 'react';
import { DeepMap, FieldValues, FieldError, UseFormRegister, UseFormWatch } from 'react-hook-form';
import "./style.css";

type PhotoUploadProps = {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  errors: DeepMap<FieldValues, FieldError>;
  fileSizeError: string | null;
  setFileSizeError: React.Dispatch<React.SetStateAction<string | null>>;
};

export function PhotoUpload({
  register,
  watch,
  errors,
  fileSizeError,
  setFileSizeError,
}: PhotoUploadProps) {
  const handleFileValidation = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const fileSizeInBytes = selectedFile.size;

      // Проверка размера файла в байтах
      if (fileSizeInBytes > 5000000) {
        setFileSizeError('File size is too large (max 5MB)');
        return;
      } else {
        setFileSizeError(null);
      }

      // Проверка размера картинки в пикселях
      const image = new Image();
      image.onload = () => {
        const imageWidth = image.width;
        const imageHeight = image.height;
        if (imageWidth < 70 || imageHeight < 70) {
          setFileSizeError('Image size should be at least 70x70 pixels');
        } else {
          setFileSizeError(null);
        }
      };

      // Установка источника после установки обработчика
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        if (readerEvent.target && readerEvent.target.result) {
          image.src = readerEvent.target.result.toString();
        }
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="photo" onChange={handleFileValidation}>
      <label className={`photo__label flex ${errors.photo ? 'error-color' : ''}`} htmlFor="fileInput">
        Upload
      </label>
      <input
        className="photo__input"
        id="fileInput"
        type="file"
        accept="image/jpeg, image/jpg"
        {...register('photo', {
          required: 'Photo is required',
          validate: (value: FileList) => {
            if (value && value[0]) {
              const allowedTypes = ['image/jpeg', 'image/jpg'];
              const fileType = value[0].type;

              if (!allowedTypes.includes(fileType)) {
                return 'Invalid file type. Allowed formats: jpeg/jpg';
              }
            }
            return true;
          }
        })}
      />
      <span className={`photo__text flex ${errors.photo ? 'error-color' : ''} ${watch('photo')?.length ? 'filled' : ''}`}>
        {watch('photo') && watch('photo')[0]?.name || 'Upload your photo'}
      </span>
      {errors.photo && <span className="error">{errors.photo.message}</span>}
      {fileSizeError && <span className="error">{fileSizeError}</span>}
    </div>
  );
};

