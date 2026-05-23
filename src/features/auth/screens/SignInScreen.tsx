import { ThemedInput, ThemedScreen } from "@/src/components/ui";
import {
  Text,
  Input,
  YStack,
  Image,
  XStack,
  Paragraph,
  styled,
  Button,
} from "tamagui";
import { useForm, Controller, FieldError } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpAnchor } from "@/src/features/auth/components";
import { supabase } from "@/supabase/client";
import { useCallback, useEffect, useState } from "react";
import { AuthError } from "@supabase/supabase-js";
import { FormControllerInput } from "@/src/components";

const SignInSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SigninFields = z.infer<typeof SignInSchema>;

export default function SignInScreen() {
  const { control, handleSubmit, formState } = useForm<SigninFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignInSchema),
  });
  const [supabaseError, setSupabaseError] = useState<AuthError | null>(null);

  const onSubmit = useCallback(
    async (data: SigninFields) => {
      setSupabaseError(null);
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        setSupabaseError(error);
      }
    },
    [supabase],
  );

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
        Welcome Back!
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
            field: { value, onChange, name },
            fieldState: { error },
          }) => (
            <FormControllerInput
              name={name}
              value={value}
              onChangeText={onChange}
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
            field: { value, onChange, name },
            fieldState: { error },
          }) => (
            <FormControllerInput
              name={name}
              value={value}
              onChangeText={onChange}
              placeholder={"Enter your password"}
              error={error}
              secureTextEntry
              rounded={"$radius.12"}
            />
          )}
        />
        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={formState.isSubmitting || formState.isValidating}
          rounded={"$radius.12"}
          mt={"$3"}
        >
          <Text fontSize={"$5"} fontWeight={"$6"}>
            submit
          </Text>
        </Button>
        <SignUpAnchor />
      </YStack>
    </ThemedScreen>
  );
}

const StyledImage = styled(Image, {
  rounded: "$radius.8",
});
