# -*- coding: utf-8 -*-
{
    'name': "Empresas",

    'summary': """
        Modulo de empresas""",

    'description': """
        Aplicación de apoyo para proyectos informáticos
        que encargan empresas contratadoras
    """,

    'author': "Javier Alemán Rodríguez",
    'website': "http://www.yourcompany.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/14.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base','project'],

    # always loaded
    'data': [
        'views/views.xml',
        'views/templates.xml',
        'security/security.xml',
        'security/ir.model.access.csv',
        'data/project_data.xml',
        'reports/empresas_report.xml',
        'reports/empresas_report_view.xml',
        # 'security/empresas_reglas_registro.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],

    'application': 'True',
}
