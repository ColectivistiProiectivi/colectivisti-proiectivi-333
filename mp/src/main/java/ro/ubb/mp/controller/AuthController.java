package ro.ubb.mp.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ro.ubb.mp.controller.dto.response.JWTResponseDTO;
import ro.ubb.mp.controller.dto.request.UserLoginDTO;
import ro.ubb.mp.controller.dto.request.UserRequestDTO;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.security.jwt.JwtUtils;
import ro.ubb.mp.service.user.UserService;

import javax.validation.Valid;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping
@Validated
@RequiredArgsConstructor
@Getter
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody UserRequestDTO user) {

        URI uri = URI.create((ServletUriComponentsBuilder.fromCurrentContextPath().path("/register").toUriString()));

        return ResponseEntity.created(uri).body(getUserService().saveUser(user));
    }

    /**
     * @param userLoginDTO wrapper object containing the username and password Strings
     * @return the JWTResponseDTO in case the login is successful
     * Using the AuthenticationManager from SecurityConfiguration we try to do an authentication
     * of the username and password we received at the endpoint. If it's successful we return the JWT
     * else we return 401 Unauthorized
     */
    @PostMapping("/login")
    public ResponseEntity<JWTResponseDTO> login(@RequestBody UserLoginDTO userLoginDTO) {
        try {
            Authentication authenticate = getAuthenticationManager()
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    userLoginDTO.getEmail(), userLoginDTO.getPassword()
                            )
                    );

            final User user = (User) authenticate.getPrincipal();

            return ResponseEntity.ok().body(
                    JWTResponseDTO
                            .builder()
                            .value(getJwtUtils().generateJwtCookie(user))
                            .email(user.getUsername())
                            .authorities(Set.of(user.getRole().toString()))
                            .build()
            );
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
