import { Button, CircularProgress, Paper, Typography } from "@material-ui/core"
import React from "react"
import styled from "styled-components"
import { MainLayout } from "../layouts/MainLayout"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import TextField from "@material-ui/core/TextField"
import { useContext } from "react"
import AuthContext from "../contexts/AuthProvider"
import { useState } from "react"
import { ButtonPrimary } from "../components/buttons/ButtonPrimary"
import IconButton from "@material-ui/core/IconButton"
import PhotoCamera from "@material-ui/icons/PhotoCamera"
import { useHistory } from "react-router"
import { useLinks } from "../hooks/useLinks"
import useAsync from "../hooks/useAsync"
import { useAppApiClient } from "../hooks/useAppApiClient"
import { useSnackbar } from "notistack"
import { Alert } from "@material-ui/lab"
import { UpdateUserRequest } from "../services/api/types/UpdateUserRequest"
import { Loading } from "../components/text/Loading"
import { GridContainer } from "../components/Grid/GridContainer"
import { UserAvatar } from "../components/UserAvatar"

export default function UserProfile() {
  const { enqueueSnackbar } = useSnackbar()

  const history = useHistory()
  const api = useAppApiClient()
  const links = useLinks().common
  const authCtx = useContext(AuthContext)
  const { user } = authCtx

  const { run, loading } = useAsync(async (data: UpdateUserRequest) => {
    const result = await api.updateUser(data)
    if (result) {
      authCtx.setUser(result)
      setIsEdit(false)
      enqueueSnackbar("Edit success!", { variant: "success" })
    } else {
      enqueueSnackbar("Edit fail!", { variant: "error" })
    }
  })

  const [isEdit, setIsEdit] = useState(false)
  const [formValue, setFormValue] = useState({
    name: user!.name,
    email: user!.email,
    age: user!.age,
  })

  const changeFormHandler = (e) => {
    const { name, value } = e.target
    setFormValue({
      ...formValue,
      [name]: value,
    })
  }

  const editHandler = () => {
    setIsEdit(true)
  }

  const saveHandler = () => {
    run({
      ...formValue,
      age: +formValue.age,
    })
  }

  const backHandler = () => {
    history.push(links.home())
  }

  const cancelEditHandler = () => {
    setIsEdit(false)
  }

  const uploadImage = useAsync(async (formData) => {
    const result = await api.uploadImage(formData)
    if (result) {
      authCtx.setAvatarUrl(URL.createObjectURL(formData.get("avatar")))
      enqueueSnackbar("Upload succes!", { variant: "success" })
    } else {
      enqueueSnackbar("Upload failure!", { variant: "error" })
    }
  })

  const handleChangeImage = (e) => {
    const data = new FormData()
    data.append("avatar", e.target.files[0])
    uploadImage.run(data)
  }

  return (
    <MainLayout>
      <CustomButton onClick={backHandler} startIcon={<ArrowBackIosIcon />}>
        Back
      </CustomButton>
      <CustomPaper>
        <GridContainer spacing={3}>
          <Avatar>
            {uploadImage.loading && (
              <Spinner>
                <CircularProgress></CircularProgress>
              </Spinner>
            )}
            <CustomAvatar src={authCtx.avatarUrl}></CustomAvatar>
            <OverlayUpLoadImage className="overlay">
              {" "}
              <InputUploadImage onChange={handleChangeImage} id="icon-button-file" accept="image/*" type="file" />
              <label htmlFor="icon-button-file">
                {" "}
                <IconButton component="span">
                  <PhotoCamera fontSize="large" />
                </IconButton>
              </label>
            </OverlayUpLoadImage>
          </Avatar>

          <Typography align="center" variant="h4">
            Your Profile
          </Typography>

          {isEdit ? (
            <TextField
              value={formValue.name}
              onChange={changeFormHandler}
              required
              name="name"
              label="Name"
              fullWidth
              autoComplete="name"
            />
          ) : (
            <CustomSpan>{user!.name}</CustomSpan>
          )}
          {isEdit ? (
            <TextField
              value={formValue.age}
              type="number"
              onChange={changeFormHandler}
              required
              name="age"
              label="Age"
              fullWidth
              autoComplete="age"
            />
          ) : (
            <CustomSpan>{user!.age} year old</CustomSpan>
          )}
          {isEdit ? (
            <TextField
              value={formValue.email}
              onChange={changeFormHandler}
              required
              name="email"
              type="email"
              label="Email"
              fullWidth
              autoComplete="email"
            />
          ) : (
            <CustomSpan>{user!.email}</CustomSpan>
          )}
          {loading && <Loading>Loading...</Loading>}
          <Actions>
            {isEdit && (
              <Button onClick={cancelEditHandler} variant="contained">
                Cancel
              </Button>
            )}
            <CustomButton onClick={isEdit ? saveHandler : editHandler}>{isEdit ? "Save" : "Edit"}</CustomButton>
          </Actions>
        </GridContainer>
      </CustomPaper>
    </MainLayout>
  )
}
const CustomSpan = styled.span`
  font-size: 1.3rem;
  text-align: center;
`

const CustomButton = styled(ButtonPrimary)`
  margin: 1rem;
`
const Actions = styled.div`
  text-align: center;
`
const CustomPaper = styled(Paper)`
  padding: 3rem;
  margin: auto;
  margin-top: 3rem;
  max-width: 50rem;
`
const CustomAvatar = styled(UserAvatar)`
  width: 15rem;
  height: 15rem;
`
const Avatar = styled.div`
  border-radius: 50%;
  overflow: hidden;
  margin: auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    .overlay {
      display: flex;
    }
  }
`
const OverlayUpLoadImage = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  animation: show 1s ease;
  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
const InputUploadImage = styled.input`
  display: none;
`
const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
