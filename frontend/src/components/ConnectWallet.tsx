
import { useWallet } from '../hooks/use-wallet';
import { SubmitButton } from './Button';
import { ShowErrorMessage } from './ShowMessage';

export function ConnectWallet() {
  const { walletAddress, isConnecting, handleConnect, handleDisconnect, errorMessage, setErrorMessage } = useWallet();

  if (walletAddress) {
    return (
      <div className="flex items-center gap-4">
        <p className="text-sm font-mono text-muted-foreground">
          {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </p>
        <SubmitButton
          title="Disconnect" 
          isSubmitting={false} 
          onClick={handleDisconnect} 
        />
      </div>
    );
  }

  return (
    <>
      <SubmitButton 
        title="Connect MetaMask"
        isSubmitting={isConnecting}
        onClick={handleConnect}
      />
      <ShowErrorMessage message={errorMessage} setErrorMessage={setErrorMessage} />
    </>
  );
}
