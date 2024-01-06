import Navigator from "@/src/navigation";
import AppBlurWrapper from "@/src/components/AppBlurWrapper";
import { AuthProvider } from "./src/ctx/AuthContext";


export default function App() {

  return (
    <AppBlurWrapper>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </AppBlurWrapper>
  );
}



