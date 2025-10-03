/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "resetPasswordTemplate": {
      "body": "  <body style=\"margin:0;padding:0;background:#0b0e1a;color:#e6e6f0;\">\n    <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"background:#0b0e1a;\">\n      <tr><td align=\"center\" style=\"padding:32px 16px;\">\n        <table role=\"presentation\" width=\"560\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:560px;max-width:100%;background:#0f1326;border:1px solid #1f2752;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.45);\">\n          <tr><td align=\"center\" style=\"padding:28px 24px 8px;\">\n            <div style=\"font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;font-size:22px;letter-spacing:2px;font-weight:800;color:#f3d36c;text-shadow:0 0 6px rgba(243,211,108,.35);\">\n              EPSI – LA SOUTENANCE\n            </div>\n            <div style=\"font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;font-size:13px;opacity:.8;margin-top:6px;\">\n              Centre d’admission des dresseurs d’arguments\n            </div>\n          </td></tr>\n\n          <tr><td style=\"padding:20px 24px 0;\">\n            <p style=\"font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;margin:0 0 12px;\">\n              Salut,\n            </p>\n            <p style=\"font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;margin:0 0 16px;opacity:.9;\">\n              Tu as demandé à réinitialiser ton mot de passe. Clique sur le bouton ci-dessous pour continuer.\n            </p>\n          </td></tr>\n\n          <tr><td align=\"center\" style=\"padding:8px 24px 24px;\">\n            <a href=\"{APP_URL}/auth/reset?token={TOKEN}\"\n               style=\"display:inline-block;background:linear-gradient(135deg,#6b62f6,#8a6cf3);color:#fff;\n                      text-decoration:none;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;\n                      font-weight:700;padding:12px 18px;border-radius:10px;border:1px solid #2a2f63;\">\n              Réinitialiser le mot de passe\n            </a>\n            <div style=\"font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;font-size:12px;opacity:.7;margin-top:12px;\">\n              Si le bouton ne fonctionne pas, copie ce lien dans ton navigateur :<br>\n              <span style=\"word-break:break-all;color:#9aa3ff;\">\n                {APP_URL}/auth/reset?token={TOKEN}\n              </span>\n            </div>\n          </td></tr>\n\n          <tr><td style=\"padding:0 24px 22px;\">\n            <p style=\"font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;margin:0;opacity:.7;font-size:12px;\">\n              Si tu n’es pas à l’origine de cette demande, ignore ce message.\n            </p>\n          </td></tr>\n\n          <tr><td align=\"center\" style=\"padding:12px 24px 20px;border-top:1px solid #1f2752;\">\n            <div style=\"font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;font-size:12px;opacity:.6;\">\n              — L’équipe {APP_NAME}\n            </div>\n          </td></tr>\n        </table>\n      </td></tr>\n    </table>\n  </body>\n"
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "resetPasswordTemplate": {
      "body": "<p>Hello,</p>\n<p>Click on the button below to reset your password.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-password-reset/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Reset password</a>\n</p>\n<p><i>If you didn't ask to reset your password, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
    }
  }, collection)

  return app.save(collection)
})
