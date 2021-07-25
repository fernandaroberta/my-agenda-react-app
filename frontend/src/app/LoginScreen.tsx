import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";

export function LoginScreen() {
  const [email, setEmail] = useState("danilo@email.com");
  const [password, setPassword] = useState("1234");

  function signIn(evt: React.FormEvent) {
    evt.preventDefault();
    alert("LOGOU");
    // if (validateEvent()) {
    //   if (isNew) {
    //     createEventEndpoint(event!).then(props.onSave);
    //   } else {
    //     updateEventEndpoint(event!).then(props.onSave);
    //   }
    // }
  }

  return (
    <Container maxWidth="sm">
      <h2>Agenda React</h2>
      <p>
        Digite e-mail e senha para entrar no sistema. Para testar, use o e-mail{" "}
        <kbd>danilo@email.com</kbd> e a senha <kbd>1234</kbd>.
      </p>
      <form onSubmit={signIn}>
        <TextField
          margin="normal"
          label="E-mail"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          //  error={!!errors.email} helperText={errors.email}
        />
        <TextField
          margin="normal"
          label="Senha"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          // error={!!errors.email}
          // helperText={errors.email}
        />
        <Box component="div" textAlign="right" marginTop="12px">
          <Button type="submit" variant="contained" color="primary">
            Entrar
          </Button>
        </Box>
      </form>
    </Container>
  );
}
