import { Box, styled, TextField } from "@mui/material";
import React from "react";
import { theme } from "../../application/theme";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { displaySnackbar } from "../../redux/slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectCompletedAnnouncementEdit } from "../../redux/selectors";
import {
  fetchAllAnnouncementsData,
  updateAnnouncementData,
} from "../../redux/actions";

export const EditAnnouncementModal = ({ open, onClose, announce }) => {
  const { handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const editAnnounce = useAppSelector(selectCompletedAnnouncementEdit);
  const checkoutSchema = yup.object().shape({
    description: yup
      .string()
      .min(50, "Descriere prea scurta...")
      .required("required"),
  });

  const [newDescription, setNewDescription] = useState("");

  const initialValues = {
    description: "",
  };

  const handleFormSubmit = () => {
    dispatch(
      updateAnnouncementData({
        id: announce.id,
        description: newDescription,
        created_at: announce.created_at,
        category: announce.category,
      })
    );
    onClose();
    if (editAnnounce) {
      dispatch(
        displaySnackbar({
          open: true,
          type: "info",
          message: "Anunt editat",
        })
      );
      setNewDescription("");
      dispatch(fetchAllAnnouncementsData());
    }
  };

  if (!open) return null;
  return (
    <ModalContainer onClick={onClose}>
      <ModalWrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Section>
          <TopSection>
            <Title>Modal</Title>
            <CloseButton onClick={onClose}>X</CloseButton>
          </TopSection>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Box display="flex" width="100%" justifyContent="center">
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Descriere"
                  onChange={(e) => setNewDescription(e.target.value)}
                  value={newDescription}
                  name="description"
                  sx={{ width: "80%" }}
                />
              </Box>
              <ButtonsContainer>
                <ConfirmButton type="submit">Editeaza</ConfirmButton>
                <OutlineButton onClick={onClose}>Anuleaza</OutlineButton>
              </ButtonsContainer>
            </form>
          </Formik>
        </Section>
      </ModalWrapper>
    </ModalContainer>
  );
};

const ModalContainer = styled("div")`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
`;

const ModalWrapper = styled("div")`
  max-width: 600px;
  width: 100%;
  height: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);
  border-radius: 8px;
`;

const Section = styled("div")`
  height: 100%;
  margin: 20px;
  align-items: center;
  justify-content: center;
`;

const ButtonsContainer = styled("div")`
  display: flex;
  padding: 1rem 1rem;
  margin-top: 30px;
  button {
    width: 100%;
    margin: 0.5rem;
    padding: 16px 0;
    border: 1px solid ${theme.main};
    cursor: pointer;
  }
`;

const ConfirmButton = styled("button")`
  background-color: ${theme.main};
  color: white;
`;

const OutlineButton = styled("button")`
  background-color: white;
  color: #411b57;
`;

const CloseButton = styled("p")`
  position: fixed;
  right: 15px;
  color: ${theme.main};
  font-weight: bold;
  cursor: pointer;
`;

const Title = styled("p")`
  font-weight: bold;
  color: ${theme.main};
`;
const TopSection = styled("div")`
  width: 100%;
  display: flex;
  justify-content: center;
`;
