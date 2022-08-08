import PageHeader from "../components/common/PageHeader";
import Input from "../components/common/Input";
import { useFormik } from "formik";
import Joi from "joi";
import validateUseFormikJoi from "../utils/formikValidateJoi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { editCard } from "../services/cardService";

function EditCard() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      bizName: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: "",
    },
    validate: validateUseFormikJoi({
      bizName: Joi.string().min(2).max(255).required().label("Name"),
      bizDescription: Joi.string()
        .min(2)
        .max(1024)
        .required()
        .label("Description"),
      bizAddress: Joi.string().min(2).max(400).required().label("Address"),
      bizPhone: Joi.string()
        .label("Phone")
        .min(9)
        .max(10)
        .required()
        .regex(/^0[2-9]\d{7,8}$/),
      bizImage: Joi.string().min(11).max(1024).allow("").uri().label("Image"),
    }),
    async onSubmit(values) {
      try {
        const { bizImage, ...body } = values;
        if (bizImage) {
          body.bizImage = bizImage;
        }

        await editCard(id, body);
        toast("great! your card is uptated 👏");
        navigate("/my-cards");
      } catch ({ response }) {
        if (response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  return (
    <>
      <PageHeader
        title='Edit your card'
        description='Please enter current values ​​and update your biz card'
      />

      <form noValidate autoComplete='off' onSubmit={form.handleSubmit}>
        {error && <div className='alert alert-danger'>{error}</div>}
        <Input
          label='Name'
          type='text'
          error={form.touched.bizName && form.errors.bizName}
          {...form.getFieldProps("bizName")}
        />
        <Input
          label='Description'
          type='text'
          error={form.touched.bizDescription && form.errors.bizDescription}
          {...form.getFieldProps("bizDescription")}
        />
        <Input
          label='Address'
          type='text'
          error={form.touched.bizAddress && form.errors.bizAddress}
          {...form.getFieldProps("bizAddress")}
        />
        <Input
          label='Phone'
          type='text'
          error={form.touched.bizPhone && form.errors.bizPhone}
          {...form.getFieldProps("bizPhone")}
        />
        <Input
          label='Image'
          type='text'
          error={form.touched.bizImage && form.errors.bizImage}
          {...form.getFieldProps("bizImage")}
        />

        <div className='my-2'>
          <button disabled={!form.isValid} className='buttons'>
            Edit your bizCard!
          </button>
        </div>
      </form>
    </>
  );
}

export default EditCard;
