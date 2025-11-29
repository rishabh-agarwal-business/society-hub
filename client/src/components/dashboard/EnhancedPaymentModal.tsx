import { useState } from 'react';
import { X, CreditCard, Building2, Smartphone, Wallet, Shield, CheckCircle2, Calendar, Repeat } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';

interface EnhancedPaymentModalProps {
    onClose: () => void;
}

export function EnhancedPaymentModal({ onClose }: EnhancedPaymentModalProps) {
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | null>(null);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [splitPayment, setSplitPayment] = useState(false);
    const [splitAmount1, setSplitAmount1] = useState(2500);
    const [splitAmount2, setSplitAmount2] = useState(2500);
    const [autoPayEnabled, setAutoPayEnabled] = useState(false);
    const [recurringDay, setRecurringDay] = useState('5');

    const totalAmount = 5000;

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setProcessing(false);
            setSuccess(true);

            // Auto close after success
            setTimeout(() => {
                onClose();
            }, 2000);
        }, 2000);
    };

    const handleSplitAmountChange = (value: number, field: 1 | 2) => {
        if (field === 1) {
            setSplitAmount1(value);
            setSplitAmount2(totalAmount - value);
        } else {
            setSplitAmount2(value);
            setSplitAmount1(totalAmount - value);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 dark:bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
            <div className="glass-card rounded-3xl p-6 md:p-8 max-w-2xl w-full my-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-slate-900 dark:text-white text-2xl">Make Payment</h2>
                        <p className="text-slate-600 dark:text-slate-400">December 2025 Maintenance Charge</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="glass-morphism p-2 rounded-xl hover:scale-105 transition-transform"
                    >
                        <X className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                    </button>
                </div>

                {!success ? (
                    <>
                        <Tabs defaultValue="single" className="mb-6">
                            <TabsList className="grid w-full grid-cols-2 glass-morphism p-1 rounded-2xl">
                                <TabsTrigger
                                    value="single"
                                    className="rounded-xl data-[state=active]:glass-button-primary"
                                    onClick={() => setSplitPayment(false)}
                                >
                                    Single Payment
                                </TabsTrigger>
                                <TabsTrigger
                                    value="split"
                                    className="rounded-xl data-[state=active]:glass-button-primary"
                                    onClick={() => setSplitPayment(true)}
                                >
                                    Split Payment
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="single">
                                {/* Amount */}
                                <div className="glass-morphism rounded-2xl p-6 mb-6 mt-6">
                                    <div className="text-slate-600 dark:text-slate-400 mb-2">Amount to Pay</div>
                                    <div className="text-slate-900 dark:text-white text-4xl">₹{totalAmount.toLocaleString()}</div>
                                    <div className="text-slate-600 dark:text-slate-400 mt-2">Due on December 10, 2025</div>
                                </div>
                            </TabsContent>

                            <TabsContent value="split">
                                <div className="space-y-4 mt-6">
                                    <div className="glass-morphism rounded-2xl p-6">
                                        <Label className="text-slate-700 dark:text-slate-300 mb-3 block">
                                            Split your payment into two parts
                                        </Label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label className="text-slate-600 dark:text-slate-400 mb-2 block text-sm">
                                                    First Payment
                                                </Label>
                                                <Input
                                                    type="number"
                                                    value={splitAmount1}
                                                    onChange={(e) => handleSplitAmountChange(Number(e.target.value), 1)}
                                                    max={totalAmount}
                                                    className="glass-input"
                                                />
                                            </div>
                                            <div>
                                                <Label className="text-slate-600 dark:text-slate-400 mb-2 block text-sm">
                                                    Second Payment
                                                </Label>
                                                <Input
                                                    type="number"
                                                    value={splitAmount2}
                                                    onChange={(e) => handleSplitAmountChange(Number(e.target.value), 2)}
                                                    max={totalAmount}
                                                    className="glass-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4 text-center">
                                            <div className="text-slate-600 dark:text-slate-400 text-sm">Total Amount</div>
                                            <div className="text-slate-900 dark:text-white text-2xl">₹{totalAmount.toLocaleString()}</div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>

                        {/* Auto-Pay Setup */}
                        <div className="glass-morphism rounded-2xl p-6 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="text-slate-900 dark:text-white flex items-center gap-2">
                                        <Repeat className="w-5 h-5" />
                                        Enable Auto-Pay
                                    </div>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                                        Automatically pay maintenance charges every month
                                    </div>
                                </div>
                                <Switch
                                    checked={autoPayEnabled}
                                    onCheckedChange={setAutoPayEnabled}
                                />
                            </div>

                            {autoPayEnabled && (
                                <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
                                    <Label className="text-slate-700 dark:text-slate-300 mb-2 block">
                                        Payment Date (Day of Month)
                                    </Label>
                                    <Input
                                        type="number"
                                        min="1"
                                        max="28"
                                        value={recurringDay}
                                        onChange={(e) => setRecurringDay(e.target.value)}
                                        className="glass-input w-32"
                                    />
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
                                        Your payment will be automatically processed on day {recurringDay} of every month
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Payment Method Selection */}
                        <div className="mb-6">
                            <Label className="text-slate-700 dark:text-slate-300 mb-3 block">
                                Select Payment Method
                            </Label>
                            <div className="grid grid-cols-3 gap-3">
                                <button
                                    onClick={() => setPaymentMethod('card')}
                                    className={`p-4 rounded-2xl transition-all ${paymentMethod === 'card'
                                        ? 'glass-button-primary'
                                        : 'glass-morphism hover:scale-105'
                                        }`}
                                >
                                    <CreditCard className="w-6 h-6 mx-auto mb-2" />
                                    <div className="text-sm">Card</div>
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('upi')}
                                    className={`p-4 rounded-2xl transition-all ${paymentMethod === 'upi'
                                        ? 'glass-button-primary'
                                        : 'glass-morphism hover:scale-105'
                                        }`}
                                >
                                    <Smartphone className="w-6 h-6 mx-auto mb-2" />
                                    <div className="text-sm">UPI</div>
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('netbanking')}
                                    className={`p-4 rounded-2xl transition-all ${paymentMethod === 'netbanking'
                                        ? 'glass-button-primary'
                                        : 'glass-morphism hover:scale-105'
                                        }`}
                                >
                                    <Building2 className="w-6 h-6 mx-auto mb-2" />
                                    <div className="text-sm">Net Banking</div>
                                </button>
                            </div>
                        </div>

                        {/* Payment Form */}
                        {paymentMethod && (
                            <form onSubmit={handlePayment} className="space-y-4">
                                {paymentMethod === 'card' && (
                                    <>
                                        <div className="space-y-2">
                                            <Label htmlFor="cardNumber" className="text-slate-700 dark:text-slate-300">
                                                Card Number
                                            </Label>
                                            <Input
                                                id="cardNumber"
                                                type="text"
                                                placeholder="1234 5678 9012 3456"
                                                className="glass-input"
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="expiry" className="text-slate-700 dark:text-slate-300">
                                                    Expiry Date
                                                </Label>
                                                <Input
                                                    id="expiry"
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    className="glass-input"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="cvv" className="text-slate-700 dark:text-slate-300">
                                                    CVV
                                                </Label>
                                                <Input
                                                    id="cvv"
                                                    type="text"
                                                    placeholder="123"
                                                    className="glass-input"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cardName" className="text-slate-700 dark:text-slate-300">
                                                Cardholder Name
                                            </Label>
                                            <Input
                                                id="cardName"
                                                type="text"
                                                placeholder="JOHN DOE"
                                                className="glass-input"
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                {paymentMethod === 'upi' && (
                                    <div className="space-y-2">
                                        <Label htmlFor="upiId" className="text-slate-700 dark:text-slate-300">
                                            UPI ID
                                        </Label>
                                        <Input
                                            id="upiId"
                                            type="text"
                                            placeholder="yourname@upi"
                                            className="glass-input"
                                            required
                                        />
                                    </div>
                                )}

                                {paymentMethod === 'netbanking' && (
                                    <div className="space-y-2">
                                        <Label htmlFor="bank" className="text-slate-700 dark:text-slate-300">
                                            Select Bank
                                        </Label>
                                        <select
                                            id="bank"
                                            className="w-full glass-input px-4 py-3 rounded-xl"
                                            required
                                        >
                                            <option value="">Choose your bank</option>
                                            <option value="hdfc">HDFC Bank</option>
                                            <option value="icici">ICICI Bank</option>
                                            <option value="sbi">State Bank of India</option>
                                            <option value="axis">Axis Bank</option>
                                            <option value="kotak">Kotak Mahindra Bank</option>
                                        </select>
                                    </div>
                                )}

                                {/* Security Notice */}
                                <div className="glass-morphism rounded-2xl p-4 flex items-start gap-3">
                                    <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                                    <div className="text-sm text-slate-600 dark:text-slate-400">
                                        Your payment is secured with 256-bit SSL encryption. We never store your card details.
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full glass-button-primary py-6 text-lg"
                                >
                                    {processing ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Processing...
                                        </div>
                                    ) : (
                                        <>Pay ₹{splitPayment ? splitAmount1.toLocaleString() : totalAmount.toLocaleString()}</>
                                    )}
                                </Button>

                                {splitPayment && (
                                    <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
                                        Remaining ₹{splitAmount2.toLocaleString()} will be charged later
                                    </p>
                                )}
                            </form>
                        )}
                    </>
                ) : (
                    /* Success State */
                    <div className="text-center py-12">
                        <div className="w-20 h-20 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-slate-900 dark:text-white text-2xl mb-2">Payment Successful!</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Your December 2025 payment has been processed successfully.
                        </p>
                        {autoPayEnabled && (
                            <div className="glass-morphism rounded-2xl p-4 mt-6 inline-block">
                                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
                                    <Repeat className="w-4 h-4" />
                                    <span>Auto-Pay Enabled</span>
                                </div>
                                <div className="text-slate-600 dark:text-slate-400 text-sm">
                                    Future payments will be processed automatically
                                </div>
                            </div>
                        )}
                        <div className="glass-morphism rounded-2xl p-4 mt-4 inline-block">
                            <div className="text-slate-600 dark:text-slate-400 mb-1">Transaction ID</div>
                            <div className="text-slate-900 dark:text-white">TXN{Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
