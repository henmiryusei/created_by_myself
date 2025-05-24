document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    if (form) {
        const requiredFields = [
            { id: 'name', label: 'お名前' },
            { id: 'tel', label: '電話番号' },
            { id: 'email', label: 'メールアドレス' },
            { id: 'inquiry', label: 'お問い合わせ内容' }
        ];

        const privacyPolicyCheckbox = document.getElementById('privacy_policy');

        // フォーム送信時の処理
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            let hasError = false;

            // 入力チェック
            requiredFields.forEach(function (fieldInfo) {
                const field = document.getElementById(fieldInfo.id);
                if (field && field.value.trim() === '') {
                    displayErrorMessage(field, `${fieldInfo.label}は必須です。`);
                    hasError = true;
                } else if (field) {
                    hideErrorMessage(field);
                }
            });

            // チェックボックス確認
            if (privacyPolicyCheckbox && !privacyPolicyCheckbox.checked) {
                const errorContainer = privacyPolicyCheckbox.closest('div');
                if (errorContainer) {
                    let checkboxErrorMessage = errorContainer.querySelector('.error-message');
                    if (!checkboxErrorMessage) {
                        checkboxErrorMessage = document.createElement('p');
                        checkboxErrorMessage.classList.add('error-message', 'text-red-600', 'text-sm', 'mt-1');
                        errorContainer.appendChild(checkboxErrorMessage);
                    }
                    checkboxErrorMessage.textContent = 'プライバシーポリシーへの同意が必要です。';
                    checkboxErrorMessage.style.display = 'block';
                    hasError = true;
                }
            } else {
                const errorContainer = privacyPolicyCheckbox.closest('div');
                const checkboxErrorMessage = errorContainer.querySelector('.error-message');
                if (checkboxErrorMessage) {
                    checkboxErrorMessage.style.display = 'none';
                }
            }

            if (!hasError) {
                form.submit();
            }
        });

        // blurイベント（リアルタイム入力チェック）
        requiredFields.forEach(function (fieldInfo) {
            const field = document.getElementById(fieldInfo.id);
            if (field) {
                field.addEventListener('blur', function () {
                    if (field.value.trim() === '') {
                        displayErrorMessage(field, `${fieldInfo.label}は必須です。`);
                    } else {
                        hideErrorMessage(field);
                    }
                });
            }
        });

        // チェックボックス変更時の処理
        if (privacyPolicyCheckbox) {
            privacyPolicyCheckbox.addEventListener('change', function () {
                const errorContainer = privacyPolicyCheckbox.closest('div');
                const checkboxErrorMessage = errorContainer.querySelector('.error-message');
                if (privacyPolicyCheckbox.checked) {
                    if (checkboxErrorMessage) {
                        checkboxErrorMessage.style.display = 'none';
                    }
                } else {
                    if (!checkboxErrorMessage) {
                        const newMessage = document.createElement('p');
                        newMessage.classList.add('error-message', 'text-red-600', 'text-sm', 'mt-1');
                        newMessage.textContent = 'プライバシーポリシーへの同意が必要です。';
                        errorContainer.appendChild(newMessage);
                    } else {
                        checkboxErrorMessage.textContent = 'プライバシーポリシーへの同意が必要です。';
                        checkboxErrorMessage.style.display = 'block';
                    }
                }
            });
        }
    }
});

// エラーメッセージを表示する関数
function displayErrorMessage(fieldElement, message) {
    let errorMessageElement = fieldElement.nextElementSibling;

    if (!errorMessageElement || !errorMessageElement.classList.contains('error-message')) {
        errorMessageElement = document.createElement('p');
        errorMessageElement.classList.add('error-message', 'text-red-600', 'text-sm', 'mt-1');
        fieldElement.parentNode.insertBefore(errorMessageElement, fieldElement.nextSibling);
    }

    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block';

    fieldElement.classList.add('border-red-500', 'bg-red-100');
}

// エラーメッセージを非表示にする関数
function hideErrorMessage(fieldElement) {
    const errorMessageElement = fieldElement.nextElementSibling;

    if (errorMessageElement && errorMessageElement.classList.contains('error-message')) {
        errorMessageElement.style.display = 'none';
    }

    fieldElement.classList.remove('border-red-500', 'bg-red-100');
}
