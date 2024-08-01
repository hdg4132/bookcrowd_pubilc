package com.example.demo3.service;

import com.example.demo3.dto.*;
import com.example.demo3.model.UserEntity;
import com.example.demo3.persistence.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    static UserRepository userRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    public ResponseDTO<?> signUp(SignUpDTO dto) {
        String email = dto.getEmail();
        String password = dto.getPassword();
        String confirmPassword = dto.getConfirmPassword();

        // email 중복 확인
        if (UserRepository.existsByEmail(email)) {
            return ResponseDTO.setFailed("중복된 Email 입니다.");
        }

        // password 확인
        if (!password.equals(confirmPassword)) {
            return ResponseDTO.setFailed("비밀번호가 일치하지 않습니다.");
        }

        // 비밀번호 암호화
        String encodedPassword = bCryptPasswordEncoder.encode(password);

        // UserEntity 생성
        UserEntity userEntity = new UserEntity(dto);
        userEntity.setPassword(encodedPassword);

        // UserRepository를 이용하여 DB에 Entity 저장 (데이터 적재)
        userRepository.save(userEntity);

        return ResponseDTO.setSuccess("회원 생성에 성공했습니다.");
    }

    public ResponseDTO<LoginResponseDTO> login(LoginDTO dto) {
        String email = dto.getEmail();
        String password = dto.getPassword();

        UserEntity userEntity = userRepository.findByEmail(email).orElse(null);
        if (userEntity == null || !bCryptPasswordEncoder.matches(password, userEntity.getPassword())) {
            return ResponseDTO.setFailed("입력하신 로그인 정보가 존재하지 않습니다.");
        }

        userEntity.setPassword("");

        String token = "";
        int exprTime = 3600000;  // 1시간

        LoginResponseDTO loginResponseDto = new LoginResponseDTO(token, exprTime, userEntity);

        return ResponseDTO.setSuccessData("로그인에 성공하였습니다.", loginResponseDto);
    }

    public ResponseDTO<?> updateProfile(UpdateProfileDTO dto) {
        try {
            UserEntity user = userRepository.findByEmail(dto.getEmail()).orElse(null);
            if (user == null) {
                return ResponseDTO.setFailed("사용자를 찾을 수 없습니다.");
            }

            user.setName(dto.getUserName());
            user.setEmail(dto.getEmail());
            user.setPhoneNumber(dto.getPhoneNumber());
            user.setAddress(dto.getAddress());
            user.setDetailAddress(dto.getDetailAddress());

            if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
                user.setPassword(bCryptPasswordEncoder.encode(dto.getPassword()));
            }

            userRepository.save(user);
            return ResponseDTO.setSuccess("회원 정보가 성공적으로 수정되었습니다.");
        } catch (Exception e) {
            return ResponseDTO.setFailed("회원 정보 수정 중 오류가 발생했습니다.");
        }
    }



    public static boolean deleteUserByEmail(String email) {
        // 이메일로 사용자 검색
        Optional<UserEntity> optionalUser = userRepository.findByEmail(email);

        // 사용자 존재 여부 확인 및 삭제
        if (optionalUser.isPresent()) {
            UserEntity user = optionalUser.get();
            userRepository.delete(user);
            return true;
        }

        // 사용자가 존재하지 않는 경우
        return false;
    }
}
