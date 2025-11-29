import { GlassButton } from "../common/GlassButton";
import { Modal } from "../common/Modal";

interface PaymentModalProps {
    openModal: boolean;
    onClose: () => void;
    title: string;
    payment: any;
}

const PaymentModal = ({
    openModal,
    onClose,
    title,
    payment
}: PaymentModalProps) => {
    return (
        <Modal
            isOpen={openModal}
            onClose={onClose}
            title={title}
        >
            <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
                    <div className="flex justify-between mb-2">
                        <span className="text-slate-600 dark:text-slate-400">Month</span>
                        <span className="text-slate-900 dark:text-white">
                            {payment.month} {payment.year}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Amount</span>
                        <span className="text-xl text-slate-900 dark:text-white">
                            ₹{payment.amount.toLocaleString()}
                        </span>
                    </div>
                </div>

                <div className="space-y-3">
                    <GlassButton variant="primary" className="w-full">
                        Pay with UPI
                    </GlassButton>
                    <GlassButton variant="outline" className="w-full glass-button">
                        Pay with Card
                    </GlassButton>
                    <GlassButton variant="outline" className="w-full glass-button">
                        Pay with Net Banking
                    </GlassButton>
                </div>

                <p className="text-xs text-center text-slate-600 dark:text-slate-400">
                    Your payment is secure and encrypted
                </p>
            </div>
        </Modal>
    )
}

export default PaymentModal