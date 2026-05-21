import { ThemedInput, ThemedScreen } from "@/src/components/ui";
import {
  Text,
  Input,
  YStack,
  Button,
  Image,
  XStack,
  Paragraph,
  styled,
} from "tamagui";
import { useForm, Controller, FieldError } from "react-hook-form";
import { SignInAnchor } from "../components/";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { supabase } from "@/lib/supabase";
import { FormControllerInput } from "@/src/components";
import { AuthError } from "@supabase/supabase-js";

const SignUpSchema = z
  .object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirm: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "passwords must match",
    path: ["passwordConfirm"],
  });

type SignUpFields = z.infer<typeof SignUpSchema>;

export default function SignUpScreen() {
  const { control, handleSubmit, setError, formState } = useForm<SignUpFields>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: zodResolver(SignUpSchema),
  });
  const [supabaseError, setSupabaseError] = useState<AuthError | null>(null);

  const onSubmit = useCallback(async (data: SignUpFields) => {
    const { data: supabaseData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (error) {
      if (error.message.toLowerCase().includes("already registered")) {
        setSupabaseError(error);
      }
    }
  }, []);

  return (
    <ThemedScreen pt={"$6"}>
      <StyledImage
        src={require("@/src/assets/images/icon.png")}
        aspectRatio={1}
        height={"$size.12"}
        self={"center"}
      />
      <Text
        fontSize={"$6"}
        fontWeight={"$8"}
        mt={"$2"}
        mb={"$4"}
        self={"center"}
      >
        Create an account
      </Text>
      <YStack gap={"$2"} px={"$4"} py={"$5"}>
        {supabaseError && (
          <Paragraph
            fontSize={"$2"}
            color={"$red8"}
            position="absolute"
            self={"center"}
          >
            {supabaseError.message}
          </Paragraph>
        )}
        <Controller
          control={control}
          name={"email"}
          render={({
            field: { value, onChange, onBlur, name },
            fieldState: { invalid, error },
          }) => (
            <FormControllerInput
              name={name}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={"example@email.com"}
              error={error}
              type="email"
              keyboardType="email-address"
              rounded={"$radius.12"}
            />
          )}
        />
        <Controller
          control={control}
          name={"password"}
          render={({
            field: { value, onChange, onBlur, name },
            fieldState: { invalid, error },
          }) => (
            <FormControllerInput
              name={"password"}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={"Enter your password"}
              error={error}
              secureTextEntry
              rounded={"$radius.12"}
            />
          )}
        />
        <Controller
          control={control}
          name={"passwordConfirm"}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { invalid, error },
          }) => (
            <FormControllerInput
              name={"confirm password"}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={"Enter your password"}
              error={error}
              secureTextEntry
              rounded={"$radius.12"}
            />
          )}
        />
        <Button
          onPress={handleSubmit(onSubmit)}
          mt={"$3"}
          rounded={"$radius.12"}
        >
          <Text fontSize={"$5"} fontWeight={"$6"} px={"$2"}>
            submit
          </Text>
        </Button>
        <SignInAnchor />
      </YStack>
    </ThemedScreen>
  );
}

const StyledImage = styled(Image, {
  rounded: "$radius.8",
});
