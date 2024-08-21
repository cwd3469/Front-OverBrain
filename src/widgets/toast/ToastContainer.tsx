import useToast from '@/hooks/useToast';
import Toast from './Toast';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return toasts.map((toast) => (
    <Toast key={toast.id} id={toast.id} message={toast.message} duration={toast.duration} onClose={removeToast} />
  ));
};

export default ToastContainer;
